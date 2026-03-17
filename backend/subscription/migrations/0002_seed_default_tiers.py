from django.db import migrations


def seed_default_tiers(apps, schema_editor):
    SubscriptionTier = apps.get_model('subscription', 'SubscriptionTier')

    default_tiers = [
        ('Tier 1', '9.99', 3),
        ('Tier 2', '19.99', 5),
        ('Tier 3', '29.99', 10),
    ]

    for name, price, max_usage in default_tiers:
        SubscriptionTier.objects.get_or_create(
            name=name,
            defaults={'price': price, 'max_usage': max_usage},
        )


def unseed_default_tiers(apps, schema_editor):
    SubscriptionTier = apps.get_model('subscription', 'SubscriptionTier')
    SubscriptionTier.objects.filter(name__in=['Tier 1', 'Tier 2', 'Tier 3']).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('subscription', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_default_tiers, unseed_default_tiers),
    ]
