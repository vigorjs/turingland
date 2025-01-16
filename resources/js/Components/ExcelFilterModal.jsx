import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import Modal from "./Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExcelFilterModal({ isOpen, setIsOpen, onFilterSubmit }) {
  const [filters, setFilters] = useState({
    title: "",
    area_id: "",
    price_min: "",
    price_max: "",
    developer_id: "",
    type: "",
    status: "",
    bathroom_count: "",
    bedroom_count: "",
    carport_count: "",
    land_area_min: "",
    land_area_max: "",
    building_area_min: "",
    building_area_max: "",
    year_built: "",
    is_featured: false
  });

  const handleClose = () => {
    setIsOpen(false);
    setFilters({
      title: "",
      area_id: "",
      price_min: "",
      price_max: "",
      developer_id: "",
      type: "",
      status: "",
      bathroom_count: "",
      bedroom_count: "",
      carport_count: "",
      land_area_min: "",
      land_area_max: "",
      building_area_min: "",
      building_area_max: "",
      year_built: "",
      is_featured: null
    });
  };

  const handleExport = () => {
    // Remove empty filters
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => 
        value !== "" && value !== null && value !== undefined
      )
    );
    onFilterSubmit(cleanedFilters);
  };

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Export Excel Filter</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Judul Property</Label>
            <Input
              id="title"
              value={filters.title}
              onChange={(e) => setFilters(prev => ({...prev, title: e.target.value}))}
              placeholder="Cari berdasarkan judul"
            />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type">Tipe Property</Label>
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters(prev => ({...prev, type: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOUSE">Rumah</SelectItem>
                <SelectItem value="APARTMENT">Apartemen</SelectItem>
                <SelectItem value="LAND">Tanah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label>Rentang Harga</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.price_min}
                onChange={(e) => setFilters(prev => ({...prev, price_min: e.target.value}))}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.price_max}
                onChange={(e) => setFilters(prev => ({...prev, price_max: e.target.value}))}
              />
            </div>
          </div>

          {/* Room Counts */}
          <div className="flex gap-2">
            <div>
              <Label htmlFor="bedroom_count">Kamar Tidur</Label>
              <Input
                id="bedroom_count"
                type="number"
                min="0"
                value={filters.bedroom_count}
                onChange={(e) => setFilters(prev => ({...prev, bedroom_count: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="bathroom_count">Kamar Mandi</Label>
              <Input
                id="bathroom_count"
                type="number"
                min="0"
                value={filters.bathroom_count}
                onChange={(e) => setFilters(prev => ({...prev, bathroom_count: e.target.value}))}
              />
            </div>
          </div>

          {/* Area Range */}
          <div>
            <Label>Luas Tanah (m²)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.land_area_min}
                onChange={(e) => setFilters(prev => ({...prev, land_area_min: e.target.value}))}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.land_area_max}
                onChange={(e) => setFilters(prev => ({...prev, land_area_max: e.target.value}))}
              />
            </div>
          </div>

          {/* Building Area Range */}
          <div>
            <Label>Luas Bangunan (m²)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.building_area_min}
                onChange={(e) => setFilters(prev => ({...prev, building_area_min: e.target.value}))}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.building_area_max}
                onChange={(e) => setFilters(prev => ({...prev, building_area_max: e.target.value}))}
              />
            </div>
          </div>

          {/* Year Built */}
          <div>
            <Label htmlFor="year_built">Tahun Dibangun</Label>
            <Input
              id="year_built"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={filters.year_built}
              onChange={(e) => setFilters(prev => ({...prev, year_built: e.target.value}))}
            />
          </div>

          {/* Featured Property */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_featured"
              checked={filters.is_featured}
              onCheckedChange={(checked) => 
                setFilters(prev => ({...prev, is_featured: checked}))
              }
            />
            <Label htmlFor="is_featured">Property Unggulan</Label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={handleClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Export Excel
          </Button>
        </div>
      </div>
    </Modal>
  );
}