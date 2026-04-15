import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Calendar, Building, Clock, DollarSign, Users, Star, Bookmark, BookmarkCheck, Eye, ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const mockOpportunities = [
  // ... (your existing mock data - keep as is)
];

export const EnhancedOpportunities = () => {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const toggleBookmark = (id) => {
    setOpportunities(prev => prev.map(opp => opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp));
  };

  const getFilteredOpportunities = () => {
    let filtered = opportunities;
    if (activeTab !== 'all') {
      if (activeTab === 'recommended') filtered = filtered.filter(opp => opp.isRecommended);
      else if (activeTab === 'bookmarked') filtered = filtered.filter(opp => opp.isBookmarked);
      else filtered = filtered.filter(opp => opp.type === activeTab);
    }
    if (searchQuery) filtered = filtered.filter(opp => opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || opp.company.toLowerCase().includes(searchQuery.toLowerCase()) || opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
    if (selectedType !== 'all') filtered = filtered.filter(opp => opp.type === selectedType);
    if (selectedLocation !== 'all') filtered = filtered.filter(opp => opp.location.includes(selectedLocation));
    return filtered;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'placement': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'freelance': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'project': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getDaysRemaining = (deadline) => {
    const diffDays = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div className="text-center mb-8 sm:mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-4">Opportunities</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">Discover internships, placements, and projects tailored to your skills and interests</p>
      </motion.div>

      {/* Search & Filters - responsive grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder="Search opportunities, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
              />
            </div>
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="internship">Internships</SelectItem>
              <SelectItem value="placement">Placements</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="project">Projects</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs - horizontally scrollable on mobile */}
      <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex w-auto min-w-max bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap px-3 py-1.5 text-sm">All</TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap px-3 py-1.5 text-sm">Recommended</TabsTrigger>
            <TabsTrigger value="internship" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap px-3 py-1.5 text-sm">Internships</TabsTrigger>
            <TabsTrigger value="placement" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap px-3 py-1.5 text-sm">Placements</TabsTrigger>
            <TabsTrigger value="bookmarked" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap px-3 py-1.5 text-sm">Bookmarked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Opportunities Grid */}
      <div className="grid gap-5 sm:gap-6">
        {getFilteredOpportunities().map((opportunity, index) => (
          <motion.div key={opportunity.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.01 }} className="group">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 pb-4 p-4 sm:p-6">
                {/* Header: stack on mobile, row on tablet+ */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Logo */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0 self-start">
                    {opportunity.companyLogo}
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors break-words">
                          {opportunity.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">{opportunity.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {opportunity.isRecommended && (
                          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 text-xs whitespace-nowrap">
                            <TrendingUp className="w-3 h-3 mr-1" />{opportunity.matchScore}% match
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => toggleBookmark(opportunity.id)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                          {opportunity.isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                        </Button>
                      </div>
                    </div>
                    {/* Info row - wraps on mobile */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span>{opportunity.location}</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span>{opportunity.duration}</span></div>
                      <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span>{opportunity.stipend}</span></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge className={`${getTypeColor(opportunity.type)} text-xs`}>{opportunity.type}</Badge>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1"><Users className="w-3 h-3" /><span>{opportunity.applicants} applied</span></div>
                        <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{opportunity.views} views</span></div>
                        <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /><span>{opportunity.rating}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{opportunity.description}</p>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">Benefits</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {opportunity.benefits.slice(0, 4).map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 dark:bg-green-500 rounded-full" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Apply by {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    <Badge variant="outline" className={`text-xs ${
                      getDaysRemaining(opportunity.deadline) <= 7
                        ? 'text-red-600 border-red-200 dark:text-red-400 dark:border-red-800'
                        : 'text-green-600 border-green-200 dark:text-green-400 dark:border-green-800'
                    }`}>
                      {getDaysRemaining(opportunity.deadline)} days left
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 text-xs sm:text-sm">View Details</Button>
                    <Button className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white text-xs sm:text-sm" size="sm">
                      Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {getFilteredOpportunities().length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No opportunities found</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};