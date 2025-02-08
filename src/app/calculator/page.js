"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "../../components/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import {
  Car,
  Home,
  Sandwich,
  ShoppingBag,
  Droplet,
  Users,
  Package,
  Building,
  Heart,
  Info,
  TreeDeciduous,
  Flame,
  Lightbulb,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import suggestions from "./suggestions";
import categories from "./categories";
import equivalencies from "./equivalencies";

const CarbonFootprintCalculator = () => {
  const [answers, setAnswers] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [categoryEmissions, setCategoryEmissions] = useState({});
  const [showFormula, setShowFormula] = useState(false);

  const [dailySuggestion, setDailySuggestion] = useState(null);
  const [suggestionCategory, setSuggestionCategory] = useState(null);

  useEffect(() => {
    
    
    if (showResults && Object.keys(categoryEmissions).length > 0) {
      // Find the category with highest emissions
      const highestCategory = Object.entries(categoryEmissions).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];

      setSuggestionCategory(highestCategory);

      // Get random suggestion from that category
      if (suggestions[highestCategory]) {
        const randomSuggestion =
          suggestions[highestCategory][
            Math.floor(Math.random() * suggestions[highestCategory].length)
          ];
        setDailySuggestion(randomSuggestion);
      }
    }
  }, [showResults, categoryEmissions]);

  const calculateCategoryEmissions = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return 0;

    return category.questions.reduce((acc, question) => {
      const value = answers[categoryId]?.[question.id] || 0;
      return acc + value * question.factor;
    }, 0);
  };

  useEffect(() => {
    // Calculate emissions for all categories in real-time
    const newCategoryEmissions = {};
    let total = 0;

    categories.forEach((category) => {
      const emission = calculateCategoryEmissions(category.id);
      newCategoryEmissions[category.id] = emission;
      total += emission;
    });

    setCategoryEmissions(newCategoryEmissions);
    setTotalEmissions(total);
  }, [answers]);

  const handleInputChange = (categoryId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [questionId]: parseFloat(value) || 0,
      },
    }));
  };

  const getEquivalencies = (emissions) => {
    return equivalencies.map((eq) => ({
      ...eq,
      value: Math.round(emissions / eq.factor),
    }));
  };

  const getEmissionLevel = (emissions) => {
    if (emissions < 1000)
      return { text: "Low Impact", color: "text-green-600", bg: "bg-green-50" };
    if (emissions < 5000)
      return {
        text: "Moderate Impact",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    return { text: "High Impact", color: "text-red-600", bg: "bg-red-50" };
  };

  const { user } = useUser();

  const saveData = async () => {
    try {
      const currentMonthIndex = new Date().getMonth(); // 0-based index
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const currentMonth = months[currentMonthIndex];

      const data = {
        clerkId: user?.id,
        updatedAt: new Date().toISOString(),
        categories: categoryEmissions,
        equivalencies: getEquivalencies(totalEmissions).reduce((acc, eq) => {
          acc[eq.name] = eq.value;
          return acc;
        }, {}),
        monthlyData: {
          [currentMonth]: Math.round(totalEmissions),
        },
      };

      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save data:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("An error occurred while saving data:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-8"
  style={{
    backgroundImage: `url('/imagec1.avif')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    //backgroundColor: "rgba(255, 255, 255, 0.8)", // Add transparency
    //borderRadius: "10px", // Optional: Add rounded corners for better design
  }}>
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1800px] mx-auto">
          {/* Main Calculator Section - 70% width */}
          <div className="lg:w-full">
  <Card className="h-full bg-white/50 shadow-lg rounded-lg">
    <CardHeader>
      <CardTitle className="text-2xl font-bold flex items-center gap-2">
        Carbon Footprint Calculator
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="ml-2 p-1 rounded-full hover:bg-gray-100"
        >
          <Info className="w-5 h-5 text-green-500" />
        </button>
      </CardTitle>
    </CardHeader>
    <CardContent>
                {showFormula && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium">
                          Calculation Formula (Based on IPCC Guidelines):
                        </p>
                        <p className="font-mono text-sm">
                          Total Emissions = Σ (Activity Data × Emission Factor)
                        </p>
                        <p className="text-sm">
                          Where:
                          <br />
                          - Activity Data = Your input (e.g., distance driven)
                          <br />- Emission Factor = Standard CO₂ equivalent per
                          unit (from EPA/IPCC)
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {!showResults ? (
                  <>
                    <div className="flex overflow-x-auto mb-6 p-3 gap-27">
                      {categories.map((category, index) => {
                        const Icon = category.icon;
                        const emission = categoryEmissions[category.id] || 0;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setCurrentCategory(index)}
                            className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-all ${
                              currentCategory === index
                                ? "bg-green-50 text-green-600 ring-2 ring-green-200"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className="text-sm font-medium">
                              {category.title}
                            </span>
                            <span className="text-xs mt-1">
                              {emission.toFixed(1)} kg CO₂
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold flex items-center gap-2">
                            {React.createElement(
                              categories[currentCategory].icon,
                              { className: "w-5 h-5" }
                            )}
                            {categories[currentCategory].title}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              getEmissionLevel(
                                categoryEmissions[
                                  categories[currentCategory].id
                                ] || 0
                              ).bg
                            } ${
                              getEmissionLevel(
                                categoryEmissions[
                                  categories[currentCategory].id
                                ] || 0
                              ).color
                            }`}
                          >
                            {(
                              categoryEmissions[
                                categories[currentCategory].id
                              ] || 0
                            ).toFixed(1)}{" "}
                            kg CO₂
                          </span>
                        </div>

                        <div className="space-y-4">
                          {categories[currentCategory].questions.map(
                            (question) => {
                              const value =
                                answers[categories[currentCategory].id]?.[
                                  question.id
                                ] || "";
                              const emission = value * question.factor;
                              return (
                                <div key={question.id} className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700">
                                    {question.label}
                                  </label>
                                  <div className="flex gap-4 items-center">
                                    <input
                                      type="number"
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-200"
                                      value={value}
                                      onChange={(e) =>
                                        handleInputChange(
                                          categories[currentCategory].id,
                                          question.id,
                                          e.target.value
                                        )
                                      }
                                      min="0"
                                      step="0.1"
                                    />
                                    <span className="text-sm text-gray-500 w-24">
                                      {emission.toFixed(1)} kg CO₂
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    Source: {question.source}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() =>
                          setCurrentCategory(Math.max(0, currentCategory - 1))
                        }
                        disabled={currentCategory === 0}
                        className="px-4 py-2 text-green-600 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {currentCategory === categories.length - 1 ? (
                        <button
                          onClick={() => {
                            setShowResults(true);
                            saveData();
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          View Results
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setCurrentCategory(currentCategory + 1)
                          }
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className={getEmissionLevel(totalEmissions).bg}>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">
                            Total Annual Emissions
                          </h3>
                          <p
                            className={`text-3xl font-bold ${
                              getEmissionLevel(totalEmissions).color
                            }`}
                          >
                            {totalEmissions.toFixed(1)} kg CO₂
                          </p>
                          <p
                            className={`text-sm mt-2 ${
                              getEmissionLevel(totalEmissions).color
                            }`}
                          >
                            {getEmissionLevel(totalEmissions).text}
                          </p>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        {getEquivalencies(totalEmissions).map((eq, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                {React.createElement(eq.icon, {
                                  className: "w-4 h-4",
                                })}
                                <h4 className="text-sm font-medium">
                                  {eq.name}
                                </h4>
                              </div>
                              <p className="text-2xl font-bold">{eq.value}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {categories.map((category) => {
                        const emission = categoryEmissions[category.id] || 0;
                        const percentage = (emission / totalEmissions) * 100;

                        return (
                          <Card key={category.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {React.createElement(category.icon, {
                                    className: "w-5 h-5",
                                  })}
                                  <h3 className="font-medium">
                                    {category.title}
                                  </h3>
                                </div>
                                <p className="font-bold">
                                  {emission.toFixed(1)} kg CO₂
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {percentage.toFixed(1)}% of total
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                    {showResults && dailySuggestion && (
                      <Card className="bg-green-50">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-6 h-6 text-green-600" />
                            <h3 className="text-lg font-bold text-green-600">
                              Suggestion
                            </h3>
                          </div>
                          <p className="text-lg mb-2">{dailySuggestion.text}</p>
                          <p className="text-sm text-gray-600">
                            Potential Impact: {dailySuggestion.impact}
                          </p>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">
                              Based on your{" "}
                              {categories
                                .find((c) => c.id === suggestionCategory)
                                ?.title.toLowerCase()}{" "}
                              emissions
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setCurrentCategory(0);
                        setAnswers({});
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Calculate Again
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarbonFootprintCalculator;
