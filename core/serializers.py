from rest_framework import serializers
from .models import Asset, User

class AssetSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Asset
        fields = '__all__'
