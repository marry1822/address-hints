// API data
const url =
	"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "a2437d97a29cf5f71a425c7ba4c82bf8aac9b5cb";

// Show address hints
$(function showAddressHints() {
	$("#address").autocomplete({
		source: function (data, cb) {
			$.ajax({
				type: "POST",
				url: url,
				data: JSON.stringify({ query: data.term }),
				dataType: "json",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Token " + token,
				},
				success: function (res) {
					const result = Object.values(res)[0];
					const list = [];
					result.map((item) => {
						list.push(item.unrestricted_value);
					});
					cb(list);
				},
			});
		},
	});
});

// Show the tooltip for address input
$(function showTooltip() {
	$("[data-tooltip]")
		.mousemove(function (eventObject) {
			$data_tooltip = $(this).attr("data-tooltip");
			$(".searchContainer__tooltip")
				.html($data_tooltip)
				.css({
					top: eventObject.pageY + 5,
					left: eventObject.pageX + 5,
				})
				.show();
		})
		.mouseout(function () {
			$(".searchContainer__tooltip").hide().html("").css({
				top: 0,
				left: 0,
			});
		});
});
