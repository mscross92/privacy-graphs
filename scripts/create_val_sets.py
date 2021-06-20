import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance_matrix
from matplotlib import pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage, set_link_color_palette, to_tree, cophenet
from collections import defaultdict
import json
import random
import pandas as pd
import tanglegram as tg
# import nltk
# from nltk.tokenize import word_tokenize

import load_glove
import load_vocab

random.seed(42)

save_outputs = True
max_removed = 10 # maximum number of words to remove - will do max_removed experiments
n_exp = 10 # number of repeats per experiment


# LOAD GLOVE WORD EMBEDDINGS
ln = 100 
embeddings_index, vector_lst, wrd_lst = load_glove.create_embeddings()
print('Found %s word vectors.' % len(embeddings_index))


# LOAD VOCAB WORDS
vocab_ori = load_vocab.get_inputwords()


# ORIGINAL CLUSTERING
desc_ori = np.zeros((len(vocab_ori),ln))
for ii,w_i in enumerate(vocab_ori):
    desc_ori[ii,:] = embeddings_index[w_i]
l_ori = linkage(desc_ori, method='average', metric='cosine')


# ITERATE THROUGH TRIALS
if save_outputs:
    f = open("outputs/val/validationinfo-maxremoved_"+str(max_removed)+"-trials_"+str(n_exp)+".txt", "w")
for m in range(max_removed):
    n_removed = m+1
    for n in range(n_exp):

        # CREATE NEW VOCAB LIST WITH WORDS RANDOMLY REMOVED
        vocab = vocab_ori
        itms_removed = random.sample(vocab,n_removed)
        vocab = [x for x in vocab if (x not in itms_removed)]

        # GET DESCRIPTORS
        desc = np.zeros((len(vocab),ln))
        for ii,w_i in enumerate(vocab):
            desc[ii,:] = embeddings_index[w_i]
 
        # AGGLOMERATIVE CLUSTERING
        plt.figure(figsize=(18,19))
        l = linkage(desc, method='average', metric='cosine')

        # VISUALISE DENDROGRAM
        if save_outputs:
            R = dendrogram(
                l,
                leaf_font_size=16.,  # font size for the x axis labels
                orientation='left',
                labels=vocab,
                distance_sort = True,
            )
            plt.savefig('outputs/val/val-'+str(n_removed)+'-'+str(n)+'-'+'_'.join(itms_removed)+'.png')
        plt.close()

        # COMPARE DENDROGRAM TO ORIGINAL
        fig = tg.plot(l_ori, l, vocab_ori, vocab)
        plt.savefig('outputs/val/val-compareori-'+str(n_removed)+'-'+str(n)+'-'+'_'.join(itms_removed)+'.png')
        plt.close()

        # WRITE TRIAL DETAILS TO TEXT FILE
        if save_outputs:
            f.write(str(n_removed)+'\t'+str(n)+'\t'+', '.join(itms_removed)+'\n')

if save_outputs:
    f.close()

