import requests


def main():
    url = 'https://www.google.com/maps/rpc/locationsharing/read?authuser=1&hl=en&gl=us&pb=!1e1!2m2!1sOiypYs_tE_Pk5NoPkd2IyAo!7e81'
    r = requests.get(url)
    x=1


if __name__ == '__main__':
    main()