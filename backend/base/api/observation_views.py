from django.http import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ObservationSerializer
from ..models import Observation

# @api_view(['GET', 'POST'])
# def requestObservations(request):

#     if request.method == 'GET':
#         # user = request.user
#         observations = Observation.objects.all()
#         serializer = ObservationSerializer(observations, many=True)
#         return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = ObservationSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def requestObservations(request):
    if request.method == 'GET':
        # user = request.user
        observations = Observation.objects.all()
        serializer = ObservationSerializer(observations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        obs_data = JSONParser().parse(request)
        obs_serializer = Observation(data=obs_data)
        
        if obs_serializer.is_valid():
            obs_serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)