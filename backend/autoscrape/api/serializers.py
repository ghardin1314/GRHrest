from rest_framework import serializers
from autoscrape.models import CarMake, CarModel, CarTrim, CarResult

class CarMakeSerializer(serializers.ModelSerializer):
    models = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # trims = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CarMake
        fields = '__all__'

class CarModelSerializer(serializers.ModelSerializer):
    trims = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CarModel
        fields = '__all__'

class CarTrimSerializer(serializers.ModelSerializer):
    # results = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CarTrim
        fields = '__all__'

class CarResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarResult
        fields = '__all__'