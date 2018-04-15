(function () {
	var sentiment_overall_value = 0;
	var sentiment_positive_value = 0;
	var sentiment_neutral_value = 0;
	var sentiment_negative_value = 0;
	var percent_positive = 0;
	var percent_neutral = 0;
	var percent_negative = 0;
	var mostPositive = {
		"tweet": "",
		"score": 0
	};
	var mostNegative = {
		"tweet": "",
		"score": 0
	};

	var tweet_analyzed = {};
	var tweet_selected = "";

	var chart = AmCharts.makeChart("contentGraph", jsonGraphData);
	chart.validateData();

	//HTML STRUCTS DEFINITION
	var cleanInput = function (event) {
		this.value = "";
	}

	var changeMiddle = function (event) {
		if (this.innerText === "Chart") {
			$("#wrapperGraphic").removeClass("hidden");
			$("#wrapperSparql").addClass("hidden");
		}
		else {
			$("#wrapperGraphic").addClass("hidden");
			$("#wrapperSparql").removeClass("hidden");
		}
	}

	var getSparqlResult = function (searchTerm, success, error) {
		if ((searchTerm != "") && (searchTerm.replace(/\s/g, ''.length) && (searchTerm))) {
			$("#inputSearch").removeClass("warningBorder");
			$.ajax({
				url: "/getSparql?filter=" + searchTerm,
				type: "get",
				contentType: "application/json",
				error: function (error) {
					console.log("error on getSparql: ", error);
				},
				success: function (response) {
					if (response.status === true) {
						success(response);
					}
					else {
						error(response.message);
					}
				}
			});
		}
		else {
			$("#inputSearch").addClass("warningBorder");
			document.getElementById("inputSearch").value = "Please, insert a term for search";
			document.getElementById("contentSparql").innerText = "";
		}

	}

	var doSparqlSearch = function (event) {
		var input = document.getElementById("inputSearch").value;
		getSparqlResult(input, function (data) {
			document.getElementById("contentSparql").innerText = data.dataSparql;
		}, function (error) {
			$("#inputSearch").addClass("warningBorder");
			document.getElementById("inputSearch").value = "Error on processing this term";
			document.getElementById("contentSparql").innerText = "";
		});
	}

	var showAnalysis = function (event) {
		document.getElementById("wrapperNluContent").innerHTML = "";
		switch (this.value.toString()) {
			case "tabEntities":
				if (tweet_analyzed.entities.length > 0) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Entity" }]);
					var th2 = createElement("th", [{ text: "Type" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					table.appendChild(trHeader);

					tweet_analyzed.entities.forEach(function (element) {
						var tr = createElement("tr", [{}]);
						var td1 = createElement("td", [{ text: element.text }]);
						var td2 = createElement("td", [{ text: element.type }]);

						tr.appendChild(td1);
						tr.appendChild(td2);
						table.appendChild(tr);

					});
					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No entities found for this tweet";
				}
				break;
			case "tabKeywords":
				if (tweet_analyzed.keywords.length > 0) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Keywords" }]);
					var th2 = createElement("th", [{ text: "Relevance" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					table.appendChild(trHeader);

					tweet_analyzed.keywords.forEach(function (element) {
						var tr = createElement("tr", [{}]);
						var td1 = createElement("td", [{ text: element.text }]);
						var td2 = createElement("td", [{ text: element.relevance }]);

						tr.appendChild(td1);
						tr.appendChild(td2);
						table.appendChild(tr);

					});
					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No keywords found for this tweet";
				}
				break;
			case "tabSentiment":
				if (tweet_analyzed.sentiment) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Sentiment" }]);
					var th2 = createElement("th", [{ text: "Score" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					table.appendChild(trHeader);

					var tr = createElement("tr", [{ attribute: "id", value: "nluSentiment" }]);
					var td1 = createElement("td", [{ text: tweet_analyzed.sentiment.document.label }]);
					var td2 = createElement("td", [{ text: tweet_analyzed.sentiment.document.score.toString() }]);

					if (tweet_analyzed.sentiment.document.score == 0) {
						tr.style.backgroundColor = "#8E8E8E";
					} else if (tweet_analyzed.sentiment.document.score > 0) {
						tr.style.backgroundColor = "#00A65A";
					} else {
						tr.style.backgroundColor = "#DD4B39";
					}

					tr.appendChild(td1);
					tr.appendChild(td2);
					table.appendChild(tr);

					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No sentiment found for this tweet";
				}
				break;
			case "tabCategories":
				if (tweet_analyzed.categories.length > 0) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Category" }]);
					var th2 = createElement("th", [{ text: "Score" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					table.appendChild(trHeader);

					tweet_analyzed.categories.forEach(function (element) {
						var tr = createElement("tr", [{}]);
						var td1 = createElement("td", [{ text: element.label }]);
						var td2 = createElement("td", [{ text: element.score.toString() }]);

						tr.appendChild(td1);
						tr.appendChild(td2);
						table.appendChild(tr);

					});
					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No categories found for this tweet";
				}
				break;
			case "tabRelations":
				if (tweet_analyzed.relations.length > 0) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Argument 1" }]);
					var th2 = createElement("th", [{ text: "Argument 2" }]);
					var th3 = createElement("th", [{ text: "Type" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					trHeader.appendChild(th3);
					table.appendChild(trHeader);

					tweet_analyzed.relations.forEach(function (element) {
						var tr = createElement("tr", [{}]);
						var td1 = createElement("td", [{ text: element["arguments"][0].text }]);
						var td2 = createElement("td", [{ text: element["arguments"][1].text }]);
						var td3 = createElement("td", [{ text: element["type"] }]);

						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
						table.appendChild(tr);

					});
					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No relations found for this tweet";
				}
				break;
			case "tabConcepts":
				console.log(tweet_analyzed.concepts);
				if (tweet_analyzed.concepts.length > 0) {
					var table = createElement("table", [{ attribute: "class", value: "tableNluAnalysis" }]);
					var trHeader = createElement("tr", [{}]);
					var th1 = createElement("th", [{ text: "Concept" }]);
					var th2 = createElement("th", [{ text: "Relevance" }]);

					trHeader.appendChild(th1);
					trHeader.appendChild(th2);
					table.appendChild(trHeader);

					tweet_analyzed.concepts.forEach(function (element) {
						var tr = createElement("tr", [{}]);
						var td1 = createElement("td", [{ text: element.text }]);
						var td2 = createElement("td", [{ text: element.relevance.toString() }]);

						tr.appendChild(td1);
						tr.appendChild(td2);
						table.appendChild(tr);

					});
					document.getElementById("wrapperNluContent").appendChild(table);
				}
				else {
					document.getElementById("wrapperNluContent").innerHTML = "No concepts found for this tweet";
				}
				break;
		}
	}

	var getNluData = function (event) {
		var self = this;
		$.ajax({
			url: "/getNluData?id=" + self.id,
			type: "get",
			contentType: "application/json",
			error: function (error) {
				console.log("error on getNluData: ", error);
			},
			success: function (response) {
				if (response.status === true) {
					document.getElementById("selectFeature").disabled = false;
					tweet_analyzed = response.data;
					document.getElementById("selectFeature").selectedIndex = 0;
					document.getElementById("wrapperNluContent").innerHTML = "";
					console.log(tweet_analyzed);
					if (tweet_selected == "") {
						tweet_selected = $("#" + self.id);
						tweet_selected.css({ "background-color": "#ededed" });
					}
					else {
						tweet_selected.css({ "background-color": "white" });
						tweet_selected = "";
						tweet_selected = $("#" + self.id);
						tweet_selected.css({ "background-color": "#ededed" });
					}

					//success(tweet_analyzed);
				}
				else {
					console.log("Error on nlu analysis");
				}
			}
		});
	}

	var headerConstruct = function (data) {
		//START CREATE ELEMENTS
		var wrapper = createElement('div', [{ attribute: 'class', value: 'header col-md-12 col-sm-12 col-xs-12' }]);
		var contentButtons = createElement('div', [{ attribute: 'class', value: 'contentButtons' }]);
		var title = createElement('h2', [{ text: data.titleText }]);
		var overall = createElement('p', [{ attribute: 'class', value: 'headerButtons', text: data.overallText, event: { type: "click", func: changeMiddle } }]);
		var details = createElement('p', [{ attribute: 'class', value: 'headerButtons', text: data.detailsText, event: { type: "click", func: changeMiddle } }]);
		//END CREATE ELEMENTS

		//START APPEND CHILD
		contentButtons.appendChild(overall);
		contentButtons.appendChild(details);

		wrapper.appendChild(title);
		wrapper.appendChild(contentButtons);

		//END APPEND CHILD
		return wrapper;
	}

	var sentimentBoxesConstruct = function (data) {
		//START CREATE ELEMENTS
		var wrapper = createElement('div', [{ attribute: 'class', value: 'boxWrapper' }]);
		var icon = createElement('span', [{ attribute: 'class', value: data.iconClass + ' boxIcon' }, data.boxIdIcon]);
		var content = createElement('div', [{ attribute: 'class', value: 'boxContent' }, data.boxIdContent]);
		var subContent = createElement('div', [{ attribute: 'class', value: 'boxSubContent' }, data.boxIdContent]);
		var contentText = createElement('span', [{ text: data.contentText }]);
		var contentValue = createElement('span', [{ attribute: "id", value: data.contentValueId, text: data.contentValue }]);
		var boxProgressBar = createElement('div', data.boxProgressBar);
		var contentProgressBar = createElement('div', data.progressBar);
		var spanTextProgressBar = createElement('span', [{ attribute: "id", value: "span_" + data.contentValueId, text: "" }]);
		//END APPEND CHILD
		contentProgressBar.appendChild(spanTextProgressBar);

		boxProgressBar.appendChild(contentProgressBar);

		subContent.appendChild(contentValue);
		subContent.appendChild(contentText);

		content.appendChild(subContent);
		content.appendChild(boxProgressBar);

		wrapper.appendChild(icon);
		wrapper.appendChild(content);

		return wrapper;
	}

	var topContainerConstruct = function () {

		var topCont = createElement('div', [{ attribute: 'id', value: 'topContainer' }, { attribute: 'class', value: 'row' }]);

		var header = headerConstruct(jsonHeader);

		var boxContainer = createElement('div', [{ attribute: 'id', value: 'boxContainer' }]);

		var boxOverall = sentimentBoxesConstruct(jsonBoxOverall);
		var boxPositive = sentimentBoxesConstruct(jsonBoxPositive);
		var boxNeutral = sentimentBoxesConstruct(jsonBoxNeutral);
		var boxNegative = sentimentBoxesConstruct(jsonBoxNegative);

		boxContainer.appendChild(boxOverall);
		boxContainer.appendChild(boxPositive);
		boxContainer.appendChild(boxNeutral);
		boxContainer.appendChild(boxNegative);

		topCont.appendChild(header);
		topCont.appendChild(boxContainer);

		return topCont;
	}

	var middleContainer = function (data) {
		var wrapper = createElement("div", [{ attribute: "id", value: "wrapperMiddle" }]);
		var wrapperLeft = createElement("div", [{ attribute: "id", value: "wrapperLeft" }]);
		var wrapperPositive = createElement("div", [{ attribute: "class", value: "wrapperSentiment" }, { attribute: "id", value: "sentP" }]);
		var wrapperNegative = createElement("div", [{ attribute: "class", value: "wrapperSentiment" }, { attribute: "id", value: "sentN" }]);
		var wrapperGraphic = createElement("div", [{ attribute: "id", value: "wrapperGraphic" }]);
		var wrapperSparql = createElement("div", [{ attribute: "class", value: "hidden" }, { attribute: "id", value: "wrapperSparql" }]);
		var wrapperSearch = createElement("div", [{ attribute: "id", value: "wrapperSearch" }]);
		var titleP = createElement("div", [{ attribute: "class", value: "titleMiddle", text: data.titlePositive }]);
		var titleN = createElement("div", [{ attribute: "class", value: "titleMiddle", text: data.titleNegative }]);
		var titleG = createElement("div", [{ attribute: "class", value: "titleMiddle", text: data.titleGraph }]);
		var titleS = createElement("div", [{ attribute: "class", value: "titleMiddle", text: data.titleSparql }]);
		var contentPositive = createElement("div", [{ attribute: "class", value: "textSentiment" }]);
		var contentNegative = createElement("div", [{ attribute: "class", value: "textSentiment" }]);
		var contentGraph = createElement("div", [{ attribute: "id", value: "contentGraph" }]);
		var contentSparql = createElement("p", [{ attribute: "id", value: "contentSparql" }]);
		var inputSearch = createElement("input", [{ attribute: "id", value: "inputSearch", event: { type: "click", func: cleanInput } }, { attribute: "value", value: data.inputSearch }]);
		var inputButton = createElement("p", [{ attribute: "id", value: "inputButton", text: data.buttonText, event: { type: "click", func: doSparqlSearch } }]);

		wrapperSearch.appendChild(inputSearch);
		wrapperSearch.appendChild(inputButton);

		wrapperSparql.appendChild(titleS);
		wrapperSparql.appendChild(wrapperSearch);
		wrapperSparql.appendChild(contentSparql);

		wrapperGraphic.appendChild(titleG);
		wrapperGraphic.appendChild(contentGraph);

		wrapperPositive.appendChild(titleP);
		//wrapperPositive.appendChild(contentPositive);

		wrapperNegative.appendChild(titleN);
		//wrapperNegative.appendChild(contentNegative);

		wrapperLeft.appendChild(wrapperPositive);
		wrapperLeft.appendChild(wrapperNegative);

		wrapper.appendChild(wrapperLeft);
		wrapper.appendChild(wrapperGraphic);
		wrapper.appendChild(wrapperSparql);

		return wrapper;
	}

	var bottomContainer = function (data) {
		var wrapper = createElement("div", [{ attribute: "id", value: "bottomContainer" }]);
		var wrapperPosts = createElement("div", [{ attribute: "id", value: "wrapperPosts" }]);
		var titlePosts = createElement("div", [{ attribute: "class", value: "titleBottom", text: data.tweetPosts }]);
		var postsContainer = createElement("div", [{ attribute: "id", value: "postsContainer" }]);
		var wrapperTweetAnalysis = createElement("div", [{ attribute: "id", value: "wrapperTweetAnalysis" }]);
		var wrapperTabs = createElement("div", [{ attribute: "id", value: "wrapperTabs" }]);
		var wrapperNluContent = createElement("div", [{ attribute: "id", value: "wrapperNluContent" }]);
		var titleTweetAnalysis = createElement("div", [{ attribute: "class", value: "titleBottom", text: data.tweetCognitiveTitle }]);
		var selectTab = createElement("select", [{ attribute: "id", value: "selectFeature", event: { type: "change", func: showAnalysis } }]);
		var tabDefault = createElement("option", [{ attribute: "value", value: "tabDefault", text: "Select a feature" }]);
		var tabEntities = createElement("option", [{ attribute: "value", value: "tabEntities", text: "Entities" }]);
		var tabKeywords = createElement("option", [{ attribute: "value", value: "tabKeywords", text: "Keywords" }]);
		var tabSentiment = createElement("option", [{ attribute: "value", value: "tabSentiment", text: "Sentiment" }]);
		var tabCategories = createElement("option", [{ attribute: "value", value: "tabCategories", text: "Categories" }]);
		var tabRelations = createElement("option", [{ attribute: "value", value: "tabRelations", text: "Relations" }]);
		var tabConcepts = createElement("option", [{ attribute: "value", value: "tabConcepts", text: "Concepts" }]);

		selectTab.appendChild(tabDefault);
		selectTab.appendChild(tabEntities);
		selectTab.appendChild(tabKeywords);
		selectTab.appendChild(tabSentiment);
		selectTab.appendChild(tabCategories);
		selectTab.appendChild(tabRelations);
		selectTab.appendChild(tabConcepts);

		wrapperTabs.appendChild(selectTab);

		wrapperPosts.appendChild(titlePosts);
		wrapperPosts.appendChild(postsContainer);

		wrapperTweetAnalysis.appendChild(titleTweetAnalysis);
		wrapperTweetAnalysis.appendChild(wrapperTabs);
		wrapperTweetAnalysis.appendChild(wrapperNluContent);

		wrapper.appendChild(wrapperPosts);
		wrapper.appendChild(wrapperTweetAnalysis);

		return wrapper;
	}

	var showTweetPosts = function (data) {
		sentiment_overall_value = 0;
		sentiment_positive_value = 0;
		sentiment_neutral_value = 0;
		sentiment_negative_value = 0;
		percent_positive = 0;
		percent_neutral = 0;
		percent_negative = 0;
		var dataProvider = [
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
		var wrapperMostPositive = "";
		var wrapperMostNegative = "";

		data.data.forEach(function (element) {
			var tweet = element.fields;
			var content = tweet.content;
			var author = tweet.author;
			var link = tweet.link;
			var nluContent = JSON.parse(tweet.nlu);
			var authorLink = link.split("/statuses")[0]
			var year = tweet.date.substring(0, 10);
			var time = tweet.date.substring(11, 16);
			var fullDate = year + " " + time;
			var date = new Date(tweet["date"]);
			var weekDate = date.toString().substring(0, 3);

			var wrapper = createElement("div", [{ attribute: "class", value: "wrapperTweetPost" }]);
			var mainWrapper = createElement("div", [{ attribute: "id", value: element.id }, { attribute: "class", value: "mainWrapperTweet", event: { type: "click", func: getNluData } }]);
			var iconWrapper = createElement("div", [{ attribute: "class", value: "iconWrapperTweet" }]);
			var wrapperTop = createElement("div", [{ attribute: "class", value: "topTweetPost" }]);
			var wrapperBottom = createElement("div", [{ attribute: "class", value: "bottomTweetPost" }]);
			var author = createElement("a", [{ attribute: "href", value: authorLink }, { attribute: "target", value: "_blank" }, { attribute: "class", value: "authorTweetPost", text: author }]);
			var date = createElement("span", [{ attribute: "class", value: "dateTweetPost", text: fullDate }]);
			var link_box = createElement("a", [{ attribute: "href", value: link }, { attribute: "target", value: "_blank" }, { attribute: "class", value: "authorTweetPost", text: "(open tweet)" }]);
			var contentBox = createElement("div", [{ attribute: "class", value: "contentTweetPost" }]);
			var contentValue = createElement("p", [{ text: content }]);
			var iconTweet = createElement("i", [{ attribute: "class", value: "fa fa-twitter" }, { attribute: "style", value: "font-size:36px" }]);

			contentBox.appendChild(contentValue);

			wrapperTop.appendChild(contentBox);

			wrapperBottom.appendChild(date);
			wrapperBottom.appendChild(author);
			wrapperBottom.appendChild(link_box);

			iconWrapper.appendChild(iconTweet);

			mainWrapper.appendChild(wrapperTop);
			mainWrapper.appendChild(wrapperBottom);

			wrapper.appendChild(iconWrapper);
			wrapper.appendChild(mainWrapper);

			document.getElementById("postsContainer").appendChild(wrapper);

			switch (weekDate) {
				case "Mon":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[0]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[0]["positive"] += 1;
					} else {
						dataProvider[0]["negative"] += 1;
					}
					break;
				case "Tue":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[1]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[1]["positive"] += 1;
					} else {
						dataProvider[1]["negative"] += 1;
					}
					break;
				case "Wed":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[2]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[2]["positive"] += 1;
					} else {
						dataProvider[2]["negative"] += 1;
					}
					break;
				case "Thu":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[3]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[3]["positive"] += 1;
					} else {
						dataProvider[3]["negative"] += 1;
					}
					break;
				case "Fri":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[4]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[4]["positive"] += 1;
					} else {
						dataProvider[4]["negative"] += 1;
					}
					break;
				case "Sat":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[5]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[5]["positive"] += 1;
					} else {
						dataProvider[5]["negative"] += 1;
					}
					break;
				case "Sun":
					if (nluContent["sentiment"]["document"]["score"] == 0) {
						dataProvider[6]["neutral"] += 1;
					} else if (nluContent["sentiment"]["document"]["score"] > 0) {
						dataProvider[6]["positive"] += 1;
					} else {
						dataProvider[6]["negative"] += 1;
					}
					break;
			}

			if (nluContent["sentiment"]["document"]["score"] == 0) {
				sentiment_neutral_value += 1;
				iconTweet.style.color = "#8E8E8E";
			} else if (nluContent["sentiment"]["document"]["score"] > 0) {
				sentiment_positive_value += 1;
				if (mostPositive["score"] < nluContent["sentiment"]["document"]["score"]) {
					mostPositive["tweet"] = tweet;
					mostPositive["score"] = nluContent["sentiment"]["document"]["score"];
					wrapperMostPositive = wrapper;

				}
				iconTweet.style.color = "#00A65A";
			} else {
				sentiment_negative_value += 1;
				if (mostNegative["score"] > nluContent["sentiment"]["document"]["score"]) {
					mostNegative["tweet"] = tweet;
					mostNegative["score"] = nluContent["sentiment"]["document"]["score"];
					wrapperMostNegative = wrapper;
				}
				iconTweet.style.color = "#DD4B39";
			}

		}, this);

		sentiment_overall_value = sentiment_positive_value + sentiment_neutral_value + sentiment_negative_value;

		percent_positive = (sentiment_positive_value * 100) / sentiment_overall_value;
		percent_neutral = (sentiment_neutral_value * 100) / sentiment_overall_value;
		percent_negative = (sentiment_negative_value * 100) / sentiment_overall_value;

		document.getElementById("sentiment_overall").innerText = sentiment_overall_value;
		document.getElementById("sentiment_positive").innerText = sentiment_positive_value;
		document.getElementById("sentiment_neutral").innerText = sentiment_neutral_value;
		document.getElementById("sentiment_negative").innerText = sentiment_negative_value;

		document.getElementById("progressBarPositive").style.width = percent_positive.toString() + "%";
		document.getElementById("progressBarNeutral").style.width = percent_neutral.toString() + "%";
		document.getElementById("progressBarNegative").style.width = percent_negative.toString() + "%";

		document.getElementById("span_sentiment_positive").innerText = Math.round(percent_positive).toString() + "%";
		document.getElementById("span_sentiment_neutral").innerText = Math.round(percent_neutral).toString() + "%";
		document.getElementById("span_sentiment_negative").innerText = Math.round(percent_negative).toString() + "%";

		document.getElementById("sentP").appendChild(wrapperMostPositive);
		document.getElementById("sentN").appendChild(wrapperMostNegative);

		chart.dataProvider = dataProvider;
		chart.validateData();
	}

	var getTweets = function (success, error) {
		$.ajax({
			url: "/getTweets",
			type: "get",
			contentType: "application/json",
			error: function (error) {
				console.log("error on getTweets: ", error);
			},
			success: function (response) {
				if (response.status === true) {
					success(response);
				}
				else {
					error(response.message);
				}
			}
		});
	}

	var topContainer = topContainerConstruct();
	var middleContainer = middleContainer(jsonTweets);
	var bottomContainer = bottomContainer(jsonBottomContainer);

	document.getElementById('bodyContainer').appendChild(topContainer);
	document.getElementById('bodyContainer').appendChild(middleContainer);
	document.getElementById('bodyContainer').appendChild(bottomContainer);

	document.getElementById("selectFeature").disabled = true;

	getTweets(showTweetPosts, function (error) {
		console.log(error);
	});

}());
