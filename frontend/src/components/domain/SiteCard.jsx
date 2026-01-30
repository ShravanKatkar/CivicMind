import React from 'react';
import Card from '../common/Card';
import { MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import siteSafeImg from '../../assets/images/site_safe.png';
import siteDangerImg from '../../assets/images/site_hazard.png';

const SiteCard = ({ site }) => {
    const navigate = useNavigate();
    const isDanger = site.status.includes('Danger') || site.status.includes('Hazard'); // Keep backward compatibility for 'Hazard' status check

    return (
        <Card
            onClick={() => navigate('/live-safety')}
            className={`min-w-[200px] w-[220px] p-0 overflow-hidden border-none shadow-md cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 bg-white rounded-3xl shrink-0`}
        >
            <div className={`h-36 w-full relative`}>
                <img
                    src={isDanger ? siteDangerImg : siteSafeImg}
                    alt={site.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 pt-2">
                <h3 className="font-bold text-base mb-1 text-gray-800 leading-tight">{site.name}</h3>
                <div className="flex items-center text-gray-400 text-[10px] font-medium mb-2">
                    <MapPin size={10} className="mr-1" />
                    {site.location}
                </div>

                <div className="flex items-center gap-1 mb-2">
                    <span className="text-orange-400 font-bold text-xs flex items-center gap-0.5">
                        {/* Render simple stars */}
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(site.rating) ? "fill-current" : "text-gray-300"}>★</span>
                        ))}
                    </span>
                    <span className="text-gray-400 text-[10px]">({site.reviews})</span>
                    <span className="text-gray-400 text-[10px] ml-1">{site.rating}</span>
                </div>

                <div className={`text-sm font-bold ${isDanger ? 'text-red-500' : 'text-green-600'}`}>
                    {isDanger ? 'Danger Alert' : 'Safe'}
                </div>
            </div>
        </Card>
    );
};

export default SiteCard;
