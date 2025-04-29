import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const options = [
  { type: "Öppet Bjälklag", thickness: 200, price: 156 },
  { type: "Öppet Bjälklag", thickness: 250, price: 187.5 },
  { type: "Öppet Bjälklag", thickness: 300, price: 225 },
  { type: "Öppet Bjälklag", thickness: 350, price: 262.5 },
  { type: "Öppet Bjälklag", thickness: 400, price: 240 },
  { type: "Öppet Bjälklag", thickness: 450, price: 270 },
  { type: "Öppet Bjälklag", thickness: 500, price: 300 },
  { type: "Öppet Bjälklag", thickness: 550, price: 330 },
  { type: "Öppet Bjälklag", thickness: 600, price: 360 },
  { type: "Öppet Bjälklag", thickness: 650, price: 390 },
  { type: "Öppet Bjälklag", thickness: 700, price: 420 },
  { type: "Öppet Bjälklag", thickness: 750, price: 450 },
  { type: "Öppet Bjälklag", thickness: 800, price: 480 },
  { type: "Slutet 0-45 GR", thickness: 200, price: 200.2 },
  { type: "Slutet 0-45 GR", thickness: 220, price: 211.75 },
  { type: "Slutet 0-45 GR", thickness: 250, price: 240.63 },
  { type: "Slutet 0-45 GR", thickness: 300, price: 288.75 },
  { type: "Slutet 0-45 GR", thickness: 350, price: 336.88 },
  { type: "Slutet 0-45 GR", thickness: 400, price: 385 },
  { type: "Slutet 0-45 GR", thickness: 450, price: 433.13 },
  { type: "Slutet 0-45 GR", thickness: 500, price: 481.25 },
  { type: "Slutet 0-45 GR", thickness: 550, price: 529.38 },
  { type: "Slutet 0-45 GR", thickness: 600, price: 577.5 },
  { type: "Slutet 0-45 GR", thickness: 650, price: 625.63 },
  { type: "Slutet 0-45 GR", thickness: 700, price: 673.75 },
  { type: "Slutet 0-45 GR", thickness: 750, price: 721.88 },
  { type: "Slutet 0-45 GR", thickness: 800, price: 770 },
  { type: "Slutet 45-90 GR", thickness: 70, price: 86.24 },
  { type: "Slutet 45-90 GR", thickness: 95, price: 117.04 },
  { type: "Slutet 45-90 GR", thickness: 120, price: 147.84 },
  { type: "Slutet 45-90 GR", thickness: 145, price: 159.5 },
  { type: "Slutet 45-90 GR", thickness: 170, price: 187 },
  { type: "Slutet 45-90 GR", thickness: 195, price: 214.5 },
  { type: "Slutet 45-90 GR", thickness: 200, price: 220 },
  { type: "Slutet 45-90 GR", thickness: 220, price: 242 },
  { type: "Slutet 45-90 GR", thickness: 250, price: 275 },
  { type: "Slutet 45-90 GR", thickness: 300, price: 330 },
  { type: "Slutet 45-90 GR", thickness: 350, price: 385 },
  { type: "Slutet 45-90 GR", thickness: 400, price: 440 },
  { type: "Slutet 45-90 GR", thickness: 450, price: 495 },
  { type: "Slutet 45-90 GR", thickness: 500, price: 550 },
  { type: "Slutet 45-90 GR", thickness: 550, price: 605 },
  { type: "Slutet 45-90 GR", thickness: 600, price: 660 },
  { type: "Slutet 45-90 GR", thickness: 650, price: 715 },
  { type: "Slutet 45-90 GR", thickness: 700, price: 770 },
  { type: "Slutet 45-90 GR", thickness: 750, price: 825 },
  { type: "Slutet 45-90 GR", thickness: 800, price: 880 }
];

const calculateDistanceCost = (distanceKm) => {
  const baseCost = 800;
  const perKmCost = 40;
  const total = baseCost + distanceKm * perKmCost;
  return total < 800 ? 800 : total;
};

const ORIGIN = "Karlsviksvägen 79, Luleå";
const GOOGLE_MAPS_API_KEY = "AIzaSyCY4FkmUeDhfM0fTmN5loF5_zCwtKK0on8";

async function fetchDistance(destination, setDistance) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(ORIGIN)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  const meters = data.rows?.[0]?.elements?.[0]?.distance?.value || 0;
  const km = meters / 1000;
  setDistance(km);
}

export default function PriceCalculator() {
  const [selectedType, setSelectedType] = useState("Öppet Bjälklag");
  const [selectedThickness, setSelectedThickness] = useState(200);
  const [area, setArea] = useState(10);
  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState("");

  const selectedOption = options.find(
    (opt) => opt.type === selectedType && opt.thickness === selectedThickness
  );
  const unitPrice = selectedOption?.price || 0;
  const materialCost = unitPrice * area;
  const distanceCost = calculateDistanceCost(distance);
  const totalPrice = materialCost + distanceCost;

  const thicknessOptions = options
    .filter((opt) => opt.type === selectedType)
    .map((opt) => opt.thickness);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Prisräknare – Lösull</h1>
      <Card className="mb-4">
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Typ av isolering</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Välj typ" />
              </SelectTrigger>
              <SelectContent>
                {[...new Set(options.map((o) => o.type))].map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Tjocklek (mm)</label>
            <Select
              value={selectedThickness.toString()}
              onValueChange={(val) => setSelectedThickness(parseInt(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj tjocklek" />
              </SelectTrigger>
              <SelectContent>
                {thicknessOptions.map((t) => (
                  <SelectItem key={t} value={t.toString()}>{t} mm</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Yta (m²)</label>
            <Input
              type="number"
              value={area}
              min={1}
              onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Arbetsplatsens adress</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex. Storgatan 5, Boden"
              />
              <Button onClick={() => fetchDistance(address, setDistance)}>
                Beräkna
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600">Avstånd beräknat: {distance.toFixed(1)} km</div>
          <div className="text-lg space-y-1">
            <p>Materialkostnad: <strong>{materialCost.toFixed(2)} kr</strong></p>
            <p>Etableringskostnad: <strong>{distanceCost.toFixed(2)} kr</strong></p>
            <p className="mt-2">Totalt pris: <strong>{totalPrice.toFixed(2)} kr</strong></p>
          </div>
        </CardContent>
      </Card>
      <div className="text-center">
        <Button>Skicka offertförfrågan</Button>
      </div>
    </div>
  );
}
