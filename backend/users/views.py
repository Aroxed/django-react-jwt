from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

# Create your views here.

class UserProfileView(APIView):
    """
    View to retrieve and update user profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve the user profile.
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        """
        Update the user profile.
        """
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
