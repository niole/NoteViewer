"""
transforms .pdfs into .txt files
"""
import os

def transform_pdfs(dir_name="dist/pdf"):
    """
    transforms all pdfs in directory
    is not very well planned out and will break if there's anything else in heree
    except directories and .pdf files
    """
    for filename in os.listdir(dir_name):
        if filename.endswith(".pdf"):
            outfile = "%s/%s_%s.txt" % (TEXTDIRPATH, dir_name.replace("/", "_"), filename)
            infile = "./%s/%s" % (dir_name, filename)
            print "transforming %s" % infile
            cmd = "pdf2txt.py -o %s %s" % (outfile, infile)
            os.system(cmd)
            print "successfully transformed %s/%s" % (dir_name, filename)
        else:
            transform_pdfs("%s/%s"%(dir_name, filename))

if __name__ == "__main__":
    TEXTDIRPATH = "./text"

    if not os.path.exists(TEXTDIRPATH):
        os.mkdir(TEXTDIRPATH)

    transform_pdfs()
