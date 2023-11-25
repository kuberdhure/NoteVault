from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.middleware.csrf import get_token
from .models import *
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions


# Create your views here.

class Home(APIView):
    
    def get(self, request):
        user = request.user
        print(user)
        books = Book.objects.all().order_by('-count')[:7]
        courses = Course.objects.all().order_by('-count')[:7]
        data = {
            "books": books,
            "courses": courses
        }
        return Response({"data" : data, "message": " Got some data"})
        # return Response({"data" : "hello", "message": " Got some data"})

class CourseAllView(APIView):
    
    def get(self, request):
        courses = Course.objects.all()
        courses_arr = []
        for course in courses:
            courses_arr.append(model_to_dict(course))
        return Response({"courses" : courses_arr, "message": " Got some data"})

class CSRF(APIView):
    def get_csrf_token(request):
        """
        View to retrieve the CSRF token.
        """
        token = get_token(request)
        return JsonResponse({'csrftoken': token})  
     
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        csrf_token = get_token(request)
        username = request.data.get("username")
        password = request.data.get("password")
        print(username, password)
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            print(user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"message": "Unsuccessful Login"})
        
class BookView(APIView):
    
    def get(self, request):
        books = Book.objects.all()
        courses = Course.objects.all()
        authors=[]
        new_books=[]
        for book in books:
            if book.author not in authors:
                authors.append(book.author)
            new_books.append(model_to_dict(book))
        return Response({"books" : new_books, "authors" : authors, "message": " Got some data"})
class PaperView(APIView):
    
    def get(self, request):
        papers = Paper.objects.all()
        courses = Course.objects.all()
        year = []
        for paper in papers:
            if paper.year not in year:
                year.append(paper.year)
        category = ["In Sem", "Mid Sem", "End Sem", "Quiz", "Assignment", "Others"]
        return Response({"papers" : papers, "courses" : courses,  "year" : year, "category" : category, "message": " Got some data"})

class CourseView(APIView):
    
    def get(self, request):
        print(request)
        course = request.GET.get("title")
        print(course)
        course = Course.objects.get(title = course)
        books = Book.objects.filter(course = course, is_approved="true")
        books_arr = []
        for book in books:
            b = model_to_dict(book)
            b['course'] = book.course.title
            books_arr.append(b)
        papers = Paper.objects.filter(course = course, is_approved="true")
        papers_arr = []
        for paper in papers:
            p = model_to_dict(paper)
            p['course'] = paper.course.title
            papers_arr.append(p)
        videos = Video.objects.filter(course = course, is_approved="true")
        videos_arr = []
        for video in videos:
            v = model_to_dict(video)
            v['course'] = video.course.title
            videos_arr.append(v)
        notes = Notes.objects.filter(course = course, is_approved="true")
        notes_arr = []
        for note in notes:
            n = model_to_dict(note)
            n['course'] = note.course.title
            notes_arr.append(n)
        return Response({"books" : books_arr, "papers" : papers_arr, "videos" : videos_arr, "notes" : notes_arr, "message": " Got some data"})
    
class NotesView(APIView):
    
    def get(self, request):
        notes = Notes.objects.all()
        courses = Course.objects.all()
        return Response({"notes" : notes, "courses" : courses, "message": " Got some data"})

class UploadView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    
    def get(self, request):
        courses = Course.objects.all()
        courses_arr = []
        for course in courses:
            courses_arr.append(course.title)
        return Response({"courses" : courses_arr, "message": " Got some data"})

    def post(self, request):
        print(request.data)
        title = request.data.get("title")
        file = request.data.get("file")
        course = request.data.get("course")
        course=Course.objects.get(title=course)
        print(course)
        material_type = request.data.get("material_type")
        if material_type == "Reference Book":
            author = request.data.get("author")
            edition = request.data.get("edition")
            cover_page = request.data.get("coverPage")
            book = Book.objects.create(title=title, cover_page=cover_page, file=file, course=course,
                                       author=author, edition=edition, uploaded_by=request.user.username, is_approved="false")
            book.save()
        elif material_type == "Question Paper":
            year = request.data.get("year")
            category = request.data.get("category")
            paper = Paper.objects.create(title=title, file=file, course=course,
                                         year=year, category=category, uploaded_by=request.user.username, is_approved="false")
            paper.save()
        elif material_type == "Videos":
            link = request.data.get("link")
            video = Video.objects.create(title=title, link=link, course=course, uploaded_by=request.user.username, is_approved="false")
            video.save()
        elif material_type == "Notes":
            cover_page = request.data.get("coverPage")
            notes = Notes.objects.create(title=title, cover_page = cover_page, file=file, course=course, uploaded_by=request.user.username, is_approved="false")
            notes.save()
        return Response({"message": " Uploaded Successfully!"}) 

class ApproveView(APIView):
    
    def get(self, request):
        books = Book.objects.filter(is_approved="false")
        books_arr = []
        for book in books:
            b = model_to_dict(book)
            b['course'] = book.course.title
            books_arr.append(b)
        papers = Paper.objects.filter(is_approved="false")
        papers_arr = []
        for paper in papers:
            p = model_to_dict(paper)
            p['course'] = paper.course.title
            papers_arr.append(p)
        videos = Video.objects.filter(is_approved="false")
        videos_arr = []
        for video in videos:
            v = model_to_dict(video)
            v['course'] = video.course.title
            videos_arr.append(v)
        notes = Notes.objects.filter(is_approved="false")
        notes_arr = []
        for note in notes:
            n = model_to_dict(note)
            n['course'] = note.course.title
            notes_arr.append(n)
        return Response({"books" : books_arr, "papers" : papers_arr, "videos" : videos_arr, "notes" : notes_arr, "message": " Got some data"})
    
    def post(self, request):
        print(request.data)
        if request.data.get("status") == "approve":
            material_type = request.data.get("type")
            if material_type == "Book":
                book = Book.objects.get(title=request.data.get("title"))
                book.is_approved = "true"
                book.approved_by = request.user.username
                book.save()
            elif material_type == "Paper":
                paper = Paper.objects.get(title=request.data.get("title"))
                paper.is_approved = "true"
                paper.approved_by = request.user.username
                paper.save()
            elif material_type == "Video":
                video = Video.objects.get(title=request.data.get("title"))
                video.is_approved = "true"
                video.approved_by = request.user.username
                video.save()
            elif material_type == "Notes":
                notes = Notes.objects.get(title=request.data.get("title"))
                notes.is_approved = "true"
                notes.approved_by = request.user.username
                notes.save()
            return Response({"message": "Approved Successfully!"})
        elif request.data.get("status") == "Reject":
            material_type = request.data.get("type")
            if material_type == "Book":
                book = Book.objects.get(title=request.data.get("title"))
                book.delete()
            elif material_type == "Paper":
                paper = Paper.objects.get(title=request.data.get("title"))
                paper.delete()
            elif material_type == "Video":
                video = Video.objects.get(title=request.data.get("title"))
                video.delete()
            elif material_type == "Notes":
                notes = Notes.objects.get(title=request.data.get("title"))
                notes.delete()
            return Response({"message": "Rejected Successfully!"})
        
class DownloadView(APIView):
    
    def get(self, request):
        material_type = request.data.get("material_type")
        if material_type == "books":
            book = Book.objects.get(id=request.data.get("id"))
            book.count += 1
            book.save()
            return FileResponse(book.file, as_attachment=True)
        elif material_type == "papers":
            paper = Paper.objects.get(id=request.data.get("id"))
            paper.count += 1
            paper.save()
            return FileResponse(paper.file, as_attachment=True)
        elif material_type == "videos":
            video = Video.objects.get(id=request.data.get("id"))
            video.count += 1
            video.save()
            return FileResponse(video.file, as_attachment=True)
        elif material_type == "notes":
            notes = Notes.objects.get(id=request.data.get("id"))
            notes.count += 1
            notes.save()
            return FileResponse(notes.file, as_attachment=True)
        return Response({"message": " Downloaded Successfully!"})