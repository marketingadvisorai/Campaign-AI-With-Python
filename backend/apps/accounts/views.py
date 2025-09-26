from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import UserProfile
from .serializers import UpdateUserProfileSerializer, UserProfileSerializer

User = get_user_model()


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.select_related('user')
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):  # noqa: D401 - short method override
        if self.request.user.is_staff:
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='me', permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @me.mapping.put
    def update_me(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UpdateUserProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(self.get_serializer(profile).data, status=status.HTTP_200_OK)
