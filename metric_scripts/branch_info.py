from github import Github
import matplotlib.pyplot as plt
import numpy as np
from collections import defaultdict
import os

def branch_commits_info(repo):
    branches = repo.get_branches()
    branch_names = []
    commit_counts = []
    
    for branch in branches:
        branch_name = branch.name
        commit_count = repo.get_commits(sha=branch_name).totalCount
        branch_names.append(branch_name)
        commit_counts.append(commit_count)
    
    # Visualization: Bar Chart Showing Number of Commits by Branch
    plt.figure(figsize=(10, 6))
    y_pos = np.arange(len(branch_names))
    plt.bar(y_pos, commit_counts, align='center', alpha=0.5)
    plt.xticks(y_pos, branch_names, rotation=90)
    plt.ylabel('Number of Commits')
    plt.title('Commits per Branch')
    
    plt.tight_layout()
    plt.savefig('commits_per_branch.png')  # Save the figure
    plt.close()

def generate_metrics_report():
    pull_requests = list(repo.get_pulls(state='all', sort='created', base='main'))
    comments_data
