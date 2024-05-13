from github import Github
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from collections import defaultdict
import os
from datetime import datetime

def commits_per_pr(pull_requests):
    pr_commit_counts = []
    pr_open_dates = []

    for pr in pull_requests:
        commits = pr.get_commits()
        pr_commit_counts.append(commits.totalCount)
        pr_open_dates.append(pr.created_at)

    # Creating the histogram
    plt.figure(figsize=(12, 6))

    # Grouping PRs by month of creation and counting commits
    pr_data = defaultdict(list)
    for i, date in enumerate(pr_open_dates):
        pr_data[date.strftime('%Y-%m')].append(pr_commit_counts[i])

    # Preparing data for plotting
    dates = list(pr_data.keys())
    date_indices = range(len(dates))
    commit_counts = [sum(pr_data[date]) for date in dates]

    plt.bar(date_indices, commit_counts, color='skyblue')
    plt.xlabel('Month of PR Creation')
    plt.ylabel('Total Number of Commits')
    plt.title('Commits per PR by Month')
    plt.xticks(ticks=date_indices, labels=dates, rotation=45, ha="right")
    plt.tight_layout()
    plt.close()  