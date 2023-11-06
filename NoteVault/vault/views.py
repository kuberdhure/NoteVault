from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login
from .models import *

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

class CourseAllView(APIView):
    
    def get(self, request):
        courses = Course.objects.all()
        return Response({"courses" : courses, "message": " Got some data"})
    
class Login(APIView):
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        print(username, password)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"user" : user,"message": "Login Successful!"})
        else:
            return Response({"message": "Unsuccessful Login"})
        
class BookView(APIView):
    
    def get(self, request):
        books = Book.objects.all()
        courses = Course.objects.all()
        authors=[]
        for book in books:
            if book.author not in authors:
                authors.append(book.author)
        return Response({"books" : books, "courses" : courses,  "authors" : authors, "message": " Got some data"})

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
        course = request.data.get("course")
        books = Book.objects.filter(course = course)
        papers = Paper.objects.filter(course = course)
        videos = Video.objects.filter(course = course)
        notes = Notes.objects.filter(course = course)
        return Response({"books" : books, "papers" : papers, "videos" : videos, "notes" : notes, "message": " Got some data"})
    
class NotesView(APIView):
    
    def get(self, request):
        notes = Notes.objects.all()
        courses = Course.objects.all()
        return Response({"notes" : notes, "courses" : courses, "message": " Got some data"})

class UploadView(APIView):
    
    def get(self, request):
        courses = Course.objects.all()
        return Response({"courses" : courses, "message": " Got some data"})

    def post(self, request):
        title = request.data.get("title")
        file = request.data.get("file")
        course = request.data.get("course")
        material_type = request.data.get("material_type")
        if material_type == "books":
            author = request.data.get("author")
            edition = request.data.get("edition")
            book = Book.objects.create(title=title, file=file, course=course, author=author, edition=edition, uploaded_by=request.user.username, is_approved=False)
            book.save()
        elif material_type == "papers":
            year = request.data.get("year")
            category = request.data.get("category")
            paper = Paper.objects.create(title=title, file=file, course=course, year=year, category=category, uploaded_by=request.user.username, is_approved=False)
            paper.save()
        elif material_type == "videos":
            link = request.data.get("link")
            video = Video.objects.create(title=title, link=link, course=course, uploaded_by=request.user.username, is_approved=False)
            video.save()
        elif material_type == "notes":
            notes = Notes.objects.create(title=title, file=file, course=course, uploaded_by=request.user.username, is_approved=False)
            notes.save()
        return Response({"message": " Uploaded Successfully!"}) 

class ApproveView(APIView):
    
    def get(self, request):
        books = Book.objects.filter(is_approved=False)
        papers = Paper.objects.filter(is_approved=False)
        videos = Video.objects.filter(is_approved=False)
        notes = Notes.objects.filter(is_approved=False)
        return Response({"books" : books, "papers" : papers, "videos" : videos, "notes" : notes, "message": " Got some data"})
    
    def post(self, request):
        if "approve" in request.data:
            material_type = request.data.get("material_type")
            if material_type == "books":
                book = Book.objects.get(id=request.data.get("id"))
                book.is_approved = True
                book.approved_by = request.user.username
                book.save()
            elif material_type == "papers":
                paper = Paper.objects.get(id=request.data.get("id"))
                paper.is_approved = True
                paper.approved_by = request.user.username
                paper.save()
            elif material_type == "videos":
                video = Video.objects.get(id=request.data.get("id"))
                video.is_approved = True
                video.approved_by = request.user.username
                video.save()
            elif material_type == "notes":
                notes = Notes.objects.get(id=request.data.get("id"))
                notes.is_approved = True
                notes.approved_by = request.user.username
                notes.save()
            return Response({"message": " Approved Successfully!"})
        else:
            material_type = request.data.get("material_type")
            if material_type == "books":
                book = Book.objects.get(id=request.data.get("id"))
                book.delete()
            elif material_type == "papers":
                paper = Paper.objects.get(id=request.data.get("id"))
                paper.delete()
            elif material_type == "videos":
                video = Video.objects.get(id=request.data.get("id"))
                video.delete()
            elif material_type == "notes":
                notes = Notes.objects.get(id=request.data.get("id"))
                notes.delete()
            return Response({"message": " Rejected Successfully!"})
        
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