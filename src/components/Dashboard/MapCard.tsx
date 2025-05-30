import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationData {
  city: string;
  country: string;
  addressLine?: string;
  mapImageUrl: string;
  attendees?: string[];
}

interface MapCardProps {
  location: LocationData;
  className?: string;
}

const MapCard: React.FC<MapCardProps> = ({
  location,
  className
}) => {
  const { city, country, addressLine, mapImageUrl, attendees } = location;
  const attendeesText = attendees && attendees.length > 0 
    ? attendees.length === 1 
      ? `${attendees[0]} has been here`
      : `${attendees[0]} and ${attendees.length - 1} other${attendees.length - 1 > 1 ? 's' : ''} have been here` 
    : '';

  return (
    <Card className={cn('overflow-hidden border border-border shadow-sm', className)}>
      <div className="aspect-video bg-muted flex items-center justify-center relative">
        {/* Placeholder for actual map rendering. Using an img tag for now. */}
        <img src={mapImageUrl} alt={`Map of ${city}, ${country}`} className="w-full h-full object-cover" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 p-2 rounded-full shadow-lg">
          <MapPin size={24} className="text-white" />
        </div>
      </div>
      <CardContent className="p-3 bg-card">
        <h3 className="font-semibold text-foreground text-sm">{city}, {country}</h3>
        {addressLine && <p className="text-xs text-muted-foreground">{addressLine}</p>}
        {attendeesText && <p className="text-xs text-muted-foreground mt-1">{attendeesText}</p>}
      </CardContent>
      <CardFooter className="p-3 border-t border-border bg-card">
        <Button variant="secondary" size="sm" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MapCard;
