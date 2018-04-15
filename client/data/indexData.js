jsonHeader = {
	titleText: "Inteligência Artificial - Twitter Insights",
	overallText: "Chart",
	detailsText: "Sparql"
}

jsonBoxOverall = {
	contentText: "OVERALL",
	iconClass: "glyphicon glyphicon-align-justify",
	contentValue: "",
	contentValueId: "sentiment_overall",
	boxIdIcon: {
		attribute: "id",
		value: "boxOverallIcon"
	},
	boxIdContent: {
		attribute: "id",
		value: "boxOverallContent"
	},
	boxProgressBar: [{}],
	progressBar: [{}]
}

jsonBoxPositive = {
	contentText: "POSITIVE",
	iconClass: "glyphicon glyphicon-triangle-top",
	contentValue: "",
	contentValueId: "sentiment_positive",
	boxIdIcon: {
		attribute: "id",
		value: "boxPositiveIcon"
	},
	boxIdContent: {
		attribute: "id",
		value: "boxPositiveContent"
	},
	boxProgressBar: [
		{ attribute: 'class', value: 'progress divProgress' },
		{ attribute: 'style', value: 'background-color: #008548' }
	],
	progressBar: [
		{ attribute: 'class', value: 'progress-bar' },
		{ attribute: 'id', value: 'progressBarPositive' },
		{ attribute: 'style', value: 'width:0%' }
	]
}

jsonBoxNeutral = {
	contentText: "NEUTRAL",
	iconClass: "glyphicon glyphicon-minus",
	contentValue: "",
	contentValueId: "sentiment_neutral",
	boxIdIcon: {
		attribute: "id",
		value: "boxNeutralIcon"
	},
	boxIdContent: {
		attribute: "id",
		value: "boxNeutralContent"
	},
	boxProgressBar: [
		{ attribute: 'class', value: 'progress divProgress' },
		{ attribute: 'style', value: 'background-color: #727272' }
	],
	progressBar: [
		{ attribute: 'class', value: 'progress-bar' },
		{ attribute: 'id', value: 'progressBarNeutral' },
		{ attribute: 'style', value: 'width:0%' }
	]
}

jsonBoxNegative = {
	contentText: "NEGATIVE",
	iconClass: "glyphicon glyphicon-triangle-bottom",
	contentValue: "",
	contentValueId: "sentiment_negative",
	boxIdIcon: {
		attribute: "id",
		value: "boxNegativeIcon"
	},
	boxIdContent: {
		attribute: "id",
		value: "boxNegativeContent"
	},
	boxProgressBar: [
		{ attribute: 'class', value: 'progress divProgress' },
		{ attribute: 'style', value: 'background-color: #B13C2E' }
	],
	progressBar: [
		{ attribute: 'class', value: 'progress-bar' },
		{ attribute: 'id', value: 'progressBarNegative' },
		{ attribute: 'style', value: 'width:0%' }
	]
}

jsonTweets = {
	titlePositive: "Most Positive",
	titleNegative: "Most Negative",
	titleGraph: "Sentiment Report",
	titleSparql: "Sparql Search",
	buttonText: "Search",
	inputSearch: "Insert a term to search on dbpedia"
}

jsonGraphData = {
	"type": "serial",
	"categoryField": "category",
	"colors": [
		"#00A65A",
		"#DD4B39",
		"#727272"
	],
	"sequencedAnimation": false,
	"startEffect": "bounce",
	"fontFamily": "Arial",
	"fontSize": 13,
	"theme": "light",
	"categoryAxis": {
		"gridPosition": "start"
	},
	"chartCursor": {
		"enabled": true
	},
	"trendLines": [],
	"graphs": [
		{
			"accessibleLabel": "[[title]]: [[value]]",
			"balloonText": "[[title]]: [[value]]",
			"bullet": "triangleUp",
			"id": "linePositive",
			"title": "Positive",
			"valueField": "positive"
		},
		{
			"accessibleLabel": "[[title]]: [[value]]",
			"balloonText": "[[title]]: [[value]]",
			"bullet": "triangleDown",
			"id": "lineNegative",
			"title": "Negative",
			"valueField": "negative"
		},
		{
			"accessibleLabel": "[[title]]: [[value]]",
			"balloonText": "[[title]]: [[value]]",
			"bullet": "diamond",
			"id": "lineNeutral",
			"title": "Neutral",
			"valueField": "neutral"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "axisValues",
			"title": "Total Values"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": true,
		"useGraphSettings": true
	},
	"titles": [
		{
			"id": "Title-1",
			"size": 15,
			"text": "Overall Sentiment Trending"
		}
	],
	"dataProvider": [
		{
			"category": "Mon",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Tue",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Wed",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Thu",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Fri",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Sat",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		},
		{
			"category": "Sun",
			"positive": 0,
			"negative": 0,
			"neutral": 0
		}
	]
}

jsonBottomContainer = {
	tweetCognitiveTitle: "Tweet Cognitive Analysis",
	tweetPosts: "Relevant Social Media Posts",
}