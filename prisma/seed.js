const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./seed_data');

async function main() {
    try {
        await prisma.$transaction(async (prisma) => {
            for (const u of data) {
                // Create user
                const user = await prisma.user.create({
                    data: {
                        name: u.name,
                        email: u.email,
                        gender: u.gender,
                        password: u.password,
                        role: u.role
                    }
                });

                if (u.courses) {
                    for (const c of u.courses) {
                        // Create course
                        const course = await prisma.course.create({
                            data: {
                                name: c.name,
                                description: c.description,
                                cover_url: c.cover_url,
                                lecturer_id: user.id
                            }
                        });

                        if (c.lessons) {
                            for (const l of c.lessons) {
                                // Create lesson
                                const lesson = await prisma.lesson.create({
                                    data: {
                                        title: l.title,
                                        description: l.description,
                                        course_id: course.id
                                    }
                                });

                                if (l.contents) {
                                    // Create contents
                                    await Promise.all(l.contents.map(async (content) => {
                                        await prisma.content.create({
                                            data: {
                                                title: content.title,
                                                body: content.body,
                                                video_url: content.video_url,
                                                lesson_id: lesson.id
                                            }
                                        });
                                    }));
                                }
                            }
                        }
                    }
                }
            }
        });

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
