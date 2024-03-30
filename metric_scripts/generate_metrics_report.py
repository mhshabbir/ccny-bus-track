from github import Github
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import os
import numpy as np
from comments_data import comments_data
from pr_duration import pr_duration
from reviews_per_contributor import reviews_per_contributor
from commits_per_pr import commits_per_pr

g = Github(os.getenv('GITHUB_TOKEN'))
repo = g.get_repo("mhshabbir/ccny-bus-track")

def generate_metrics_report():
    pull_requests = list(repo.get_pulls(state='all', sort='created', base='main'))
    comments_data(pull_requests)
    commits_per_pr(pull_requests)
    pr_duration(pull_requests)
    reviews_per_contributor(pull_requests)

if __name__ == "__main__":
    generate_metrics_report()
