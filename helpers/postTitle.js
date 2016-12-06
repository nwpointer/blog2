module.exports = function (content) {
	content = content.split('posts/')[1]
	content = content.split('.')[0]
	content = content.replace(/-/g, ' ');
  	return content
}