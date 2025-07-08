from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in prm/__init__.py
from prm import __version__ as version

setup(
	name="prm",
	version=version,
	description="patient room management",
	author="Mosaab",
	author_email="bleik.mosaab@hotmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
