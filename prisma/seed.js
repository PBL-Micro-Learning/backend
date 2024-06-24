const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./seed_data');

async function main() {
    try {
        // await prisma.$transaction(async (prisma) => {
        for (let u of data) {
            // Create user
            const user = await prisma.user.create({
                data: {
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    gender: u.gender,
                    password: u.password
                }
            });

            if (!u.courses) {
                continue;
            }

            for (let c of u.courses) {
                // Create course
                const course = await prisma.course.create({
                    data: {
                        name: c.name,
                        description: c.description,
                        cover_url: c.cover_url,
                        lecturer_id: user.id
                    }
                });

                for (let l of c.lessons) {
                    // Create lesson
                    const lesson = await prisma.lesson.create({
                        data: {
                            title: l.title,
                            description: l.description,
                            course_id: course.id
                        }
                    });

                    // Create contents
                    let contents = l.contents.map(c => ({
                        title: c.title,
                        body: c.body,
                        video_url: c.video_url,
                        lesson_id: lesson.id
                    }));

                    await prisma.content.createMany({
                        data: contents
                    });
                }
            }
        }
        // });

        console.log("Data seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error("Main function error:", e);
        process.exit(1);
    });
