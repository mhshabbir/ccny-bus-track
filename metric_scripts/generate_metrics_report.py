from github import Github
import matplotlib.pyplot as plt
import os
import numpy as np
from comments_data import comments_data
from pr_duration import pr_duration
from reviews_per_contributor import reviews_per_contributor
from commits_per_pr import commits_per_pr
from branch_info import branch_commits_info
import code_review as metrics

def generate_metrics_report():
    pull_requests = list(repo.get_pulls(state='all', sort='created', base='main'))
    comments_data(pull_requests)
    commits_per_pr(pull_requests)
    pr_duration(pull_requests)
    reviews_per_contributor(pull_requests)
    branch_commits_info(repo)
    metrics.cr_metrics(pull_requests)

if __name__ == "__main__":
    g = Github(os.getenv('GITHUB_TOKEN'))
    repo = g.get_repo("mhshabbir/ccny-bus-track")
    generate_metrics_report()
