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
import { usePage } from "@inertiajs/react";

export default function ExcelFilterModal({ isOpen, setIsOpen, onFilterSubmit }) {
  const { areas, categories, developers, locations } = usePage().props;

  const [filters, setFilters] = useState({
    title: "",
    location_id: "", // Tambah filter lokasi
    area_id: "",
    price_min: "",
    price_max: "",
    developer_id: "",
    category_id: "",
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

  // Filter area berdasarkan location yang dipilih
  const filteredAreas = filters.location_id 
    ? areas.filter(area => area.location_id === parseInt(filters.location_id))
    : areas;

  const handleClose = () => {
    setIsOpen(false);
    setFilters({
      title: "",
      location_id: "",
      area_id: "",
      price_min: "",
      price_max: "",
      developer_id: "",
      category_id: "",
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

  // Reset area ketika lokasi berubah
  const handleLocationChange = (locationId) => {
    setFilters(prev => ({
      ...prev,
      location_id: locationId,
      area_id: "" // Reset area ketika lokasi berubah
    }));
  };

  const handleExport = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (typeof value === 'string' && value.trim() === '') {
          return false;
        }
        return value !== "" && value !== null && value !== undefined;
      }).map(([key, value]) => {
        if (['location_id', 'area_id', 'category_id', 'developer_id',
             'bathroom_count', 'bedroom_count', 'carport_count', 'year_built'].includes(key)) {
          return [key, parseInt(value)];
        }
        if (['price_min', 'price_max', 'land_area_min', 'land_area_max',
             'building_area_min', 'building_area_max'].includes(key)) {
          return [key, parseFloat(value)];
        }
        return [key, value];
      })
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

          {/* Location Dropdown */}
          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Select
              value={filters.location_id}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Dropdown */}
          <div>
            <Label htmlFor="area">Area</Label>
            <Select
              value={filters.area_id}
              onValueChange={(value) => setFilters(prev => ({...prev, area_id: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih area" />
              </SelectTrigger>
              <SelectContent>
                {filteredAreas.map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Dropdown */}
          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={filters.category_id}
              onValueChange={(value) => setFilters(prev => ({...prev, category_id: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Developer Dropdown */}
          <div>
            <Label htmlFor="developer">Developer</Label>
            <Select
              value={filters.developer_id}
              onValueChange={(value) => setFilters(prev => ({...prev, developer_id: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih developer" />
              </SelectTrigger>
              <SelectContent>
                {developers.map((developer) => (
                  <SelectItem key={developer.id} value={developer.id}>
                    {developer.name}
                  </SelectItem>
                ))}
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
