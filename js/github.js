jQuery.githubUser = function(callback) {
	jQuery.getJSON("github.json", callback);
};

jQuery.fn.loadRepositories = function(username) {
	this.html(
		"<span>Querying GitHub for " + username + "'s repositories...</span>"
	);

	var target = this;
	$jq2.githubUser(function(data) {
		var repos = data;
		sortByName(repos);
		var list = $("<dl/>");
		target.empty().append(list);
		stop = repos.length - 6;
		if (stop < 0) stop = 0;
		for (i = repos.length - 1; i >= stop; i--) {
			repo = repos[i];
			if (repo.name != username.toLowerCase() + ".github.com") {
				list.append(
					'<dt><a href="' +
						(repo.homepage ? repo.homepage : repo.html_url) +
						'">' +
						repo.name.trim() +
						"</a> <em>" +
						(repo.language ? "(" + repo.language + ")" : "") +
						"</em></dt>"
				);
				if (repo.description != null) {
					list.append("<dd>" + repo.description + "</dd>");
				} else {
					list.append("<dd>" + "GitHub Project" + "</dd>");
				}
			}
		}
	});

	function sortByName(repos) {
		repos.sort(function(a, b) {
			return 0.5 - Math.random();
		});
	}
};
