"""
transforms .pdfs into .txt files
"""

import os

def transform_pdfs(dir_name="pdf"):
    """
    transforms all pdfs in directory
    is not very well planned out and will break if there's anything else in heree
    except directories and .pdf files
    """
    for filename in os.listdir(dir_name):
        print filename
        if filename.endswith(".pdf"):
            outfile = "./text/%s%s.txt" % (dir_name.replace("/", "_"), filename)
            infile = "./%s/%s" % (dir_name, filename)
            cmd = "pdf2txt.py -o %s %s" % (outfile, infile)
            os.system(cmd)
            print "successfully transformed %s%s" % (dir_name, filename)
        else:
            return transform_pdfs("%s/%s"%(dir_name, filename))

transform_pdfs()
