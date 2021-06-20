# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from scipy.spatial import distance_matrix
# from matplotlib import pyplot as plt
# from scipy.cluster.hierarchy import dendrogram, linkage, set_link_color_palette, to_tree, cophenet
# from collections import defaultdict
# import json
# import random
# # import nltk
# # from nltk.tokenize import word_tokenize

# import load_glove
# import load_vocab

# random.seed(42)

# # load glove word embeddings
# embeddings_index, vector_lst, wrd_lst = load_glove.create_embeddings()
# print('Found %s word vectors.' % len(embeddings_index))

# # load vocab words
# vocab_ori = load_vocab.get_inputwords()


# # CREATE DISTANCE MATRIX 
# vocab = vocab_ori
# ln = 100 #length of descriptor - using 100D word embeddings, change if change embeddings
# # desc = np.zeros((len(vocab),ln))
# # m = np.zeros((len(vocab),len(vocab)))

# # for ii,w_i in enumerate(vocab):

# #     # get descriptor
# #     v = embeddings_index[w_i]
# #     desc[ii,:] = v
    
# #     # compute similarity with all other words in vocab
# #     ds = []
# #     for jj,w_j in enumerate(vocab):
# #         d = cosine_similarity([v],[embeddings_index[w_j]])
# #         m[ii,jj] = d
# #         ds.append(d)

# # plot similarity matrix
# # mm = (m / np.max(m)).astype('uint8')
# # plt.imshow(m,cmap='gray')
# # plt.axis('off')
# # plt.show()

# # save distance matrix to file
# # np.savetxt('glove_all_sim.txt',m)


# # AGGLOMERATIVE CLUSTERING
# # plt.figure(figsize=(18,19))

# # l = linkage(desc, method='average', metric='cosine')

# # R = dendrogram(
# #     l,
# #     leaf_font_size=16.,  # font size for the x axis labels
# #     orientation='left',
# #     labels=vocab,
# #     distance_sort = True,
# # )
# # plt.savefig('outputs/dendrogram-vocab-Glove100D.png')
# # plt.close()

# # EXPERIMENT: VALIDATION
# n_exp = 2
# max_removed = 2

# f = open("outputs/validationinfo-maxremoved_"+str(max_removed)+"-trials_"+str(n_exp)+".txt", "w")

# for m in range(max_removed):
#     n_removed = m+1

#     for n in range(n_exp):
#         vocab = vocab_ori

#         itms_removed = random.sample(vocab,n_removed)
#         # print(n_removed,itms_removed)
#         vocab = [x for x in vocab if (x not in itms_removed)]

#         # COMPUTE DISTANCE MATRIX
#         desc = np.zeros((len(vocab),ln))
#         m = np.zeros((len(vocab),len(vocab)))

#         for ii,w_i in enumerate(vocab):

#             # get descriptor
#             v = embeddings_index[w_i]
#             desc[ii,:] = v
            
#             # compute similarity with all other words in vocab
#             ds = []
#             for jj,w_j in enumerate(vocab):
#                 d = cosine_similarity([v],[embeddings_index[w_j]])
#                 m[ii,jj] = d
#                 ds.append(d)

#         # AGGLOMERATIVE CLUSTERING
#         plt.figure(figsize=(18,19))
#         l = linkage(desc, method='average', metric='cosine')
#         R = dendrogram(
#             l,
#             leaf_font_size=16.,  # font size for the x axis labels
#             orientation='left',
#             labels=vocab,
#             distance_sort = True,
#         )
#         plt.savefig('outputs/val-'+str(n_removed)+'-'+str(n)+'-'+'_'.join(itms_removed)+'.png')
#         plt.close()

#         f.write(str(n_removed)+'\t'+str(n)+'\t'+', '.join(itms_removed)+'\n')

# f.close()

import tanglegram as tg
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Generate two distance matrices and just switch labels in one
labelsA= ['A', 'B', 'C', 'D','E']
labelsB= ['B', 'A', 'C', 'E']
dataA = [[ 0, .1, .4, .3, .2],
[.1, 0, .5, .6, .8],
[ .4, .5, 0, .2, .1],
[ .3, .6, .2, 0, .1],
[.5, .9, .3, .3]]

dataB = [[ 0, .1, .4, .3],
[.1, 0, .5, .6],
[ .4, .5, 0, -.2],
[ .3, .6, .2, 0]]

mat1 = pd.DataFrame(dataA,
columns=labelsA,
index=labelsA)

mat2 = pd.DataFrame(dataB,
columns=labelsB,
index=labelsB)

# Plot tanglegram
fig = tg.plot(mat1, mat2)
plt.show()

