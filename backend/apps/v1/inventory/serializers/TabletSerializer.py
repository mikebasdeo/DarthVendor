from rest_framework import serializers
from backend.apps.v1.inventory.serializers.AbstractSerializers import AbstractComputerSerializer
from backend.apps.v1.inventory.serializers.DimensionSerializer import DimensionSerializer
from backend.apps.v1.inventory.serializers.SizeSerializer import SizeSerializer


class TabletSerializer(AbstractComputerSerializer):
    os = serializers.CharField()
    dimension = DimensionSerializer()
    size = SizeSerializer()
    cameraInfo = serializers.CharField()
    batteryInfo = serializers.CharField()
