import os
import yaml

YAML_NAME = os.path.join(os.path.dirname(__file__), 'config.yml')
with open(YAML_NAME, 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)