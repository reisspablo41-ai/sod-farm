"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Info } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductOption = {
  id: string;
  format: string;
  price: number;
  sq_ft_coverage: number;
  weight_lbs: number | null;
  is_available: boolean;
};

type Props = {
  product?: ProductOption;
  grassTypeName?: string;
};

export default function SodCalculator({ product, grassTypeName }: Props) {
  const router = useRouter();
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const rawSqFt = l * w;
  const totalSqFt = Math.ceil(rawSqFt * 1.05); // 5% waste buffer

  // When a product is provided, calculate units of that format needed + total cost + total weight
  const pricePerSqft = product ? product.price / product.sq_ft_coverage : 0;
  const unitsNeeded = product ? Math.ceil(totalSqFt / product.sq_ft_coverage) : 0;
  const totalCost = product ? unitsNeeded * product.price : 0;
  const totalWeight = product?.weight_lbs != null ? unitsNeeded * product.weight_lbs : null;

  const quoteParams = new URLSearchParams({
    ...(grassTypeName ? { variety: grassTypeName } : {}),
    ...(product ? { format: product.format } : {}),
    sqft: String(totalSqFt),
  });

  return (
    <Card className="w-full mx-auto overflow-hidden border-none shadow-2xl rounded-[40px] bg-white group">
      <CardHeader className="bg-primary text-white p-8 pb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
            <CalcIcon size={24} className="text-secondary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Professional Grade</span>
        </div>
        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter leading-none">
          Sod <span className="text-secondary">Calculator</span>
        </CardTitle>
        <CardDescription className="text-white/60 font-medium pt-2">
          Calculate your exact needs with 5% waste margin included.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 -mt-8 bg-white rounded-t-[40px] space-y-8">
        {/* Selected format banner */}
        {product ? (
          <div className="flex items-center justify-between bg-secondary/10 border border-secondary/20 rounded-2xl px-5 py-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary/60 mb-0.5">Selected Format</p>
              <p className="font-black text-primary uppercase tracking-wide">{product.format}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary/60 mb-0.5">Coverage</p>
              <p className="font-black text-primary">{product.sq_ft_coverage.toLocaleString()} sq ft</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground font-medium text-center py-2">
            Select a format above to calculate pricing.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length" className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Length (ft)</Label>
            <Input
              id="length"
              type="number"
              placeholder="0"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="h-14 rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all font-bold text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width" className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Width (ft)</Label>
            <Input
              id="width"
              type="number"
              placeholder="0"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="h-14 rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all font-bold text-lg"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-black/5">
          <div className="flex justify-between items-end p-6 bg-primary rounded-3xl text-white relative overflow-hidden group/result">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/result:scale-110 transition-transform">
              <Info size={48} />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">Estimated Total</p>
              <p className="text-4xl font-black text-secondary">
                {product
                  ? `$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : "—"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-2xl text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Total Sq Ft</p>
              <p className="text-xl font-bold text-primary">{totalSqFt > 0 ? totalSqFt.toLocaleString() : "—"}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-2xl text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">
                {product ? `${product.format}s Needed` : "Units Needed"}
              </p>
              <p className="text-xl font-bold text-primary">
                {product && totalSqFt > 0 ? unitsNeeded : "—"}
              </p>
            </div>
          </div>

          {product && totalSqFt > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 rounded-xl text-xs font-bold text-muted-foreground">
              <span>{product.sq_ft_coverage.toLocaleString()} sq ft × {unitsNeeded} {product.format}(s)</span>
              <span className="text-primary">${pricePerSqft.toFixed(3)} / sq ft</span>
            </div>
          )}

          {product && product.weight_lbs != null && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Weight / Unit</p>
                <p className="text-xl font-bold text-primary">{product.weight_lbs.toLocaleString()} lbs</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Total Weight</p>
                <p className="text-xl font-bold text-primary">
                  {totalSqFt > 0 && totalWeight != null ? `${totalWeight.toLocaleString()} lbs` : "—"}
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 space-y-4">
            <Button
              disabled={!product || totalSqFt === 0}
              onClick={() => router.push(`/contact?${quoteParams.toString()}`)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl font-black text-xl italic uppercase tracking-widest h-auto"
            >
              Request This Sod Quote
            </Button>
            <p className="text-[10px] text-center text-muted-foreground uppercase font-black tracking-tighter">
              Expert Farm-Direct Quote • Ready within 24 Hours
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
