# Use the Python base image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy the Django project into the container
COPY . /app/

# Expose the port where Django runs (default is 8000)
EXPOSE 8000

# Define the command to start the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
