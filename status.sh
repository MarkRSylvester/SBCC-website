echo "=== SBCC Project Status ===" > project_status.txt
echo "Last Updated: $(date)" >> project_status.txt
echo "\nCurrent Working Branches:" >> project_status.txt
git branch >> project_status.txt
echo "\nLast 5 Commits:" >> project_status.txt
git log -5 --oneline >> project_status.txt
echo "\nUncommitted Changes:" >> project_status.txt
git status -s >> project_status.txt
echo "\nKey Files Modified:" >> project_status.txt
git diff --name-only HEAD~5 HEAD >> project_status.txt
cat project_status.txt
