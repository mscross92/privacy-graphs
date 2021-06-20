import numpy as np

def create_embeddings():
    vector_lst = []
    wrd_lst = []
    embeddings_index = {}
    f = open('data/glove/glove.6B.100d.txt', encoding='utf-8')
    for line in f:
        values = line.split()
        word = values[0]
        coefs = np.asarray(values[1:], dtype='float32')
        embeddings_index[word] = coefs
        vector_lst.append(coefs)
        wrd_lst.append(word)
    f.close()

    return embeddings_index, vector_lst, wrd_lst