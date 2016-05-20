import os

npm = "npm "
initialize = " init "
install = "install "
save = " --save-dev"

os.system(npm + initialize);

print("!!!!!!!!!!!!!!!!!!!!!!")
print("INSTALLING EXPRESS.")
print("!!!!!!!!!!!!!!!!!!!!!!")

os.system(npm + install + "express" + save)

print("!!!!!!!!!!!!!!!!!!!!!!")
print("INSTALLING TINY-LR.")
print("!!!!!!!!!!!!!!!!!!!!!!")

os.system(npm + install + "tiny-lr" + save)


print("!!!!!!!!!!!!!!!!!!!!!!")
print("INSTALLING LIVE RELOAD.")
print("!!!!!!!!!!!!!!!!!!!!!!")

os.system(npm + install + "livereload" + save)

print("!!!!!!!!!!!!!!!!!!!!!!")
print("TESTING GULP:")
print("!!!!!!!!!!!!!!!!!!!!!!")

os.system("gulp")

