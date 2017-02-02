"""
transforms .pdfs into .txt files
"""

import os

def transform_pdfs(dir_name):
    """
    transforms all pdfs in directory
    is not very well planned out and will break if there's anything else in heree
    except directories and .pdf files
    """
    for filename in os.listdir(dir_name):
        if filename.endswith(".pdf"):
            #outfile = "~/niole/js/ReactDemo/text/%s.txt"%filename
            outfile = "./text/%s.txt"%filename
            infile = "./%s/%s" % (dir_name, filename)
            cmd = "pdf2txt.py -o %s %s" % (outfile, infile)
            os.system(cmd)
        else:
            return transform_pdfs("%s/%s"%(dir_name, filename))

transform_pdfs("pdf")

