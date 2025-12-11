import React from 'react';

interface FilterSidebarProps {
    onAreaChange: (area: string) => void;
    onPriceChange: (price: number) => void;
    selectedArea: string;
    maxPrice: number;
}

const AREAS = [
    'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
    'Egyptian', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican',
    'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Polish',
    'Portuguese', 'Russian', 'Spanish', 'Thai', 'Tunisian', 'Turkish', 'Vietnamese'
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    onAreaChange,
    onPriceChange,
    selectedArea,
    maxPrice
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
            <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

            {/* Price Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price: ${maxPrice}
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => onPriceChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$0</span>
                    <span>$100+</span>
                </div>
            </div>

            {/* Area Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine
                </label>
                <select
                    value={selectedArea}
                    onChange={(e) => onAreaChange(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2 px-3 border"
                >
                    <option value="">All Cuisines</option>
                    {AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
