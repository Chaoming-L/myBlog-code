msg=${*:-"c"}

git add --all;
git commit -m "$msg";
git push origin master:master;
hexo d;