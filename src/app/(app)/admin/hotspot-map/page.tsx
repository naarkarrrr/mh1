import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HotspotMapPage() {
  const heatmapImage = PlaceHolderImages.find((img) => img.id === 'heatmap');

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Citywide Hotspot Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Health Incident Heatmap</CardTitle>
          <CardDescription>
            Aggregated anonymous patient data showing potential outbreak zones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            {heatmapImage && (
              <Image
                src={heatmapImage.imageUrl}
                alt={heatmapImage.description}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                data-ai-hint={heatmapImage.imageHint}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
