from github import Github
import matplotlib.pyplot as plt
import numpy as np
from collections import defaultdict
import os

def comments_data(pull_requests):
    pr_comments_authors = defaultdict(lambda: defaultdict(int))  # {pr_number: {author: count}}
    all_authors = set()

    for pr in pull_requests:
        comments = pr.get_issue_comments()
        for comment in comments:
            author = comment.user.login
            pr_comments_authors[pr.number][author] += 1
            all_authors.add(author)

    # Visualization 1: Stacked Bar Chart for PRs and Comment Authors
    unique_authors = list(all_authors)
    pr_indices = list(pr_comments_authors.keys())
    author_indices = {author: i for i, author in enumerate(unique_authors)}

    # Initialize a matrix to hold comment counts for each PR-author combination
    comment_matrix = np.zeros((len(pr_indices), len(unique_authors)))

    for i, pr in enumerate(pr_indices):
        for author, count in pr_comments_authors[pr].items():
            author_idx = author_indices[author]
            comment_matrix[i, author_idx] = count

    plt.figure(figsize=(10, 6))
    bottoms = np.zeros(len(pr_indices))
    for author_idx, author in enumerate(unique_authors):
        plt.bar(pr_indices, comment_matrix[:, author_idx], bottom=bottoms, label=author)
        bottoms += comment_matrix[:, author_idx]

    plt.title('PR Comments by Author')
    plt.xlabel('PR Number')
    plt.ylabel('Number of Comments')
    plt.xticks(ticks=range(len(pr_indices)), labels=pr_indices, rotation=45)
    plt.legend(title="Authors", bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.close()

    # Visualization 2: Bar Chart Showing Number of Comments by Contributor
    contributor_comment_counts = defaultdict(int)
    for pr_data in pr_comments_authors.values():
        for author, count in pr_data.items():
            contributor_comment_counts[author] += count

    contributors = list(contributor_comment_counts.keys())
    counts = [contributor_comment_counts[author] for author in contributors]

    plt.figure(figsize=(10, 6))
    plt.bar(contributors, counts, color='skyblue')
    plt.title('Number of Comments by Contributor')
    plt.xlabel('Contributor')
    plt.ylabel('Number of Comments')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.close()

    # Visualization 1: Stacked Bar Chart for PRs and Comment Authors
    unique_authors = list(all_authors)
    pr_indices = list(pr_comments_authors.keys())
    author_indices = {author: i for i, author in enumerate(unique_authors)}
    
    # Initialize a matrix to hold comment counts for each PR-author combination
    comment_matrix = np.zeros((len(pr_indices), len(unique_authors)))
    
    for i, pr in enumerate(pr_indices):
        for author, count in pr_comments_authors[pr].items():
            author_idx = author_indices[author]
            comment_matrix[i, author_idx] = count
    
    plt.figure(figsize=(10, 6))
    bottoms = np.zeros(len(pr_indices))
    for author_idx, author in enumerate(unique_authors):
        plt.bar(pr_indices, comment_matrix[:, author_idx], bottom=bottoms, label=author)
        bottoms += comment_matrix[:, author_idx]
    
    plt.title('PR Comments by Author')
    plt.xlabel('PR Number')
    plt.ylabel('Number of Comments')
    plt.xticks(rotation=45)
    plt.legend(title="Authors")
    plt.tight_layout()
    plt.savefig('pr_comments_by_author.png')
    plt.close()

    # Visualization 2: Bar Chart Showing Number of Comments by Contributor
    contributor_comment_counts = defaultdict(int)
    for pr_data in pr_comments_authors.values():
        for author, count in pr_data.items():
            contributor_comment_counts[author] += count
    
    contributors = list(contributor_comment_counts.keys())
    counts = [contributor_comment_counts[author] for author in contributors]
    
    plt.figure(figsize=(10, 6))
    plt.bar(contributors, counts, color='skyblue')
    plt.title('Number of Comments by Contributor')
    plt.xlabel('Contributor')
    plt.ylabel('Number of Comments')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('comments_by_contributor.png')
    plt.close()
