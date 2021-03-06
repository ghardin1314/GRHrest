from django.db import models


class CarMake(models.Model):
    name = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    def __str__(self):
        return str(self.pk) + ' ' + self.name

    def has_somemodels(self):
        return self.models.count() > 0

    def has_someresult(self):
        return self.results.count() > 100


class CarModel(models.Model):
    carmake_pk = models.ForeignKey(
        CarMake, related_name='models', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    def __str__(self):
        return str(self.pk) + ' ' + str(self.carmake_pk) + ' ' + self.name

    def has_sometrims(self):
        return self.trims.count() > 0

    # TODO write test
    def has_someresult(self):
        return self.results.count() > 100


class CarTrim(models.Model):
    carmake_pk = models.ForeignKey(
        CarMake, related_name='trims', on_delete=models.CASCADE)
    carmodel_pk = models.ForeignKey(
        CarModel, related_name='trims', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    def __str__(self):
        return str(self.pk) + ' ' + str(self.carmake_pk) + ' ' + str(self.carmodel_pk) + ' ' + self.name

    # TODO: write test
    def has_someresult(self):
        return self.results.count() > 100


class CarResult(models.Model):
    carmake_pk = models.ForeignKey(
        CarMake, related_name='results', on_delete=models.CASCADE)
    carmodel_pk = models.ForeignKey(
        CarModel, related_name='results', on_delete=models.CASCADE)
    cartrim_pk = models.ForeignKey(
        CarTrim, related_name='results', on_delete=models.CASCADE, blank=True, null=True)

    year = models.IntegerField()
    miles = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return str(self.pk)
