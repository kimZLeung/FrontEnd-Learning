export default function renderFullPage(html, state) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
		  <meta charset="UTF-8">
		</head>
		<body>
		  <div id="app">
		    <div>
		      ${html}
		    </div>
		  </div>
		  <script>
		    window.__INITIAL_STATE__ = ${JSON.stringify(state)};
		  </script>
		  <script src="/bundle.js"></script>
		</body>
		</html>
	`
}