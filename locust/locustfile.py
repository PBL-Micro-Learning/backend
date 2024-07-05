import json
from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):

    def on_start(self):
        """
        This method is called when a simulated user starts executing the task set.
        It performs initial setup tasks like testing the home page, logging in as a lecturer,
        and verifying the lecturer login.
        """
        self.test_home()
        self.login_as_lecturer()
        self.test_whoami_lecturer()
        self.get_user_list()
        self.get_course_list()
        self.get_lesson_list()
        self.get_content_list()
        self.get_quiz_list()

    def test_home(self):
        """
        Simulates a GET request to the home page.
        """
        self.client.get("/")

    def login_as_lecturer(self):
        """
        Simulates a lecturer login by sending a POST request with lecturer credentials.
        Stores the returned token for authenticated requests.
        """
        payload = {
            "email": "naura@lecturer.com",
            "password": "password"
        }
        response = self.client.post("/api/auth/login", json=payload)
        response_data = response.json()
        self.lecturer_token = response_data['data']['token']
        self.lecturer_headers = {
            "Authorization": f"Bearer {self.lecturer_token}",
            "Content-Type": "application/json"
        }

    def test_whoami_lecturer(self):
        """
        Simulates a GET request to the /auth/whoami endpoint to verify the lecturer's identity.
        """
        self.client.get("/api/auth/whoami", headers=self.lecturer_headers)

    def get_user_list(self):
        """
        Simulates a GET request to retrieve the user list and stores the user IDs.
        """
        response = self.client.get("/api/users", headers=self.lecturer_headers)
        response_data = response.json()
        self.user_ids = [user['id'] for user in response_data['data']]

    def get_course_list(self):
        """
        Simulates a GET request to retrieve the course list and stores the course IDs.
        """
        response = self.client.get("/api/courses", headers=self.lecturer_headers)
        response_data = response.json()
        self.course_ids = [course['id'] for course in response_data['data']]

    def get_lesson_list(self):
        """
        Simulates a GET request to retrieve the lesson list and stores the lesson IDs.
        """
        response = self.client.get("/api/lessons", headers=self.lecturer_headers)
        response_data = response.json()
        self.lesson_ids = [lesson['id'] for lesson in response_data['data']]

    def get_content_list(self):
        """
        Simulates a GET request to retrieve the content list and stores the content IDs.
        """
        response = self.client.get("/api/contents", headers=self.lecturer_headers)
        response_data = response.json()
        self.content_ids = [content['id'] for content in response_data['data']]

    def get_quiz_list(self):
        """
        Simulates a GET request to retrieve the quiz list and stores the quiz IDs.
        """
        response = self.client.get("/api/quizzes", headers=self.lecturer_headers)
        response_data = response.json()
        self.quiz_ids = [quiz['id'] for quiz in response_data['data']]

    @task(1)
    def test_lecturer_get_users(self):
        """
        Simulates a GET request to retrieve all users, using lecturer credentials.
        """
        self.client.get("/api/users", headers=self.lecturer_headers)

    @task(2)
    def test_lecturer_get_user_by_id(self):
        """
        Simulates a GET request to retrieve a specific user by ID, using lecturer credentials.
        Uses the first user ID from the stored list.
        """
        if self.user_ids:
            user_id = self.user_ids[0]
            self.client.get(f"/api/users/{user_id}", headers=self.lecturer_headers)

    @task(4)
    def test_lecturer_get_courses(self):
        """
        Simulates a GET request to retrieve all courses, using lecturer credentials.
        """
        self.client.get("/api/courses", headers=self.lecturer_headers)

    @task(5)
    def test_lecturer_get_course_detail(self):
        """
        Simulates a GET request to retrieve a specific course by ID, using lecturer credentials.
        Uses the first course ID from the stored list.
        """
        if self.course_ids:
            course_id = self.course_ids[0]
            self.client.get(f"/api/courses/{course_id}", headers=self.lecturer_headers)

    @task(8)
    def test_lecturer_get_lessons(self):
        """
        Simulates a GET request to retrieve all lessons, using lecturer credentials.
        """
        self.client.get("/api/lessons", headers=self.lecturer_headers)

    @task(9)
    def test_lecturer_get_lesson_detail(self):
        """
        Simulates a GET request to retrieve a specific lesson by ID, using lecturer credentials.
        Uses the first lesson ID from the stored list.
        """
        if self.lesson_ids:
            lesson_id = self.lesson_ids[0]
            self.client.get(f"/api/lessons/{lesson_id}", headers=self.lecturer_headers)

    @task(12)
    def test_lecturer_get_contents(self):
        """
        Simulates a GET request to retrieve all contents, using lecturer credentials.
        """
        self.client.get("/api/contents", headers=self.lecturer_headers)

    @task(13)
    def test_lecturer_get_content_detail(self):
        """
        Simulates a GET request to retrieve a specific content by ID, using lecturer credentials.
        Uses the first content ID from the stored list.
        """
        if self.content_ids:
            content_id = self.content_ids[0]
            self.client.get(f"/api/contents/{content_id}", headers=self.lecturer_headers)

    @task(23)
    def test_lecturer_show_quiz_list(self):
        """
        Simulates a GET request to retrieve all quizzes, using lecturer credentials.
        """
        self.client.get("/api/quizzes", headers=self.lecturer_headers)

    @task(24)
    def test_lecturer_show_quiz_detail(self):
        """
        Simulates a GET request to retrieve a specific quiz by ID, using lecturer credentials.
        Uses the first quiz ID from the stored list.
        """
        if self.quiz_ids:
            quiz_id = self.quiz_ids[0]
            self.client.get(f"/api/quizzes/{quiz_id}", headers=self.lecturer_headers)

    @task(25)
    def test_lecturer_show_question_of_the_quiz(self):
        """
        Simulates a GET request to retrieve questions of a specific quiz, using lecturer credentials.
        Uses the first quiz ID from the stored list.
        """
        if self.quiz_ids:
            quiz_id = self.quiz_ids[0]
            self.client.get(f"/api/quizzes/{quiz_id}/questions", headers=self.lecturer_headers)

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)
    host = "https://pbl-micro-learling.up.railway.app"
