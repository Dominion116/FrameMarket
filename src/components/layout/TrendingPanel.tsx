import React from 'react';
import { TrendingUp, Clock, Users, Flame, ArrowUpRight } from 'lucide-react';

const TrendingPanel: React.FC = () => {
    const trendingCollections = [
        { name: "Bored Ape Yacht Club", floor: "68.5 ETH", change: "+12.3%", volume: "420 ETH" },
        { name: "CryptoPunks", floor: "85.2 ETH", change: "+8.7%", volume: "380 ETH" },
        { name: "Art Blocks", floor: "12.8 ETH", change: "+15.2%", volume: "210 ETH" },
        { name: "Doodles", floor: "9.4 ETH", change: "+5.8%", volume: "150 ETH" },
        { name: "Moonbirds", floor: "6.7 ETH", change: "+9.1%", volume: "120 ETH" }
    ];

    const recentActivity = [
        { user: "vitalik.eth", action: "bought", item: "Cosmic Explorer #123", time: "2 min ago", price: "1.5 ETH" },
        { user: "beeple.eth", action: "listed", item: "Digital Dreams #456", time: "5 min ago", price: "2.3 ETH" },
        { user: "punk6529.eth", action: "made offer", item: "Neon Genesis #789", time: "10 min ago", price: "0.8 ETH" },
        { user: "snoopdogg.eth", action: "sold", item: "Abstract Vision #012", time: "15 min ago", price: "3.2 ETH" }
    ];

    return (
        <div className="h-full overflow-y-auto scrollbar-modern p-6 space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold gradient-text mb-2">Live Activity</h2>
                <p className="text-muted-foreground text-sm">Real-time market updates</p>
            </div>

            {/* Trending Collections */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                    <Flame size={20} className="text-primary" />
                    <h3 className="font-semibold">Trending Collections</h3>
                </div>
                <div className="space-y-4">
                    {trendingCollections.map((collection, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors">
                            <div className="flex-1">
                                <p className="font-medium text-sm mb-1">{collection.name}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>Floor: {collection.floor}</span>
                                    <span>Vol: {collection.volume}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 text-sm font-semibold">{collection.change}</span>
                                <ArrowUpRight size={14} className="text-green-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-primary" />
                    <h3 className="font-semibold">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium">{activity.user}</p>
                                <span className="text-primary text-sm font-semibold">{activity.price}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                                {activity.action} <span className="font-medium">{activity.item}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Stats */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                    <Users size={20} className="text-primary" />
                    <h3 className="font-semibold">Market Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">24.5K</p>
                        <p className="text-muted-foreground text-xs">Active Users</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">12.3K</p>
                        <p className="text-muted-foreground text-xs">NFTs Listed</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">$42M</p>
                        <p className="text-muted-foreground text-xs">Volume 24h</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">3.2K</p>
                        <p className="text-muted-foreground text-xs">New Collections</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingPanel;
