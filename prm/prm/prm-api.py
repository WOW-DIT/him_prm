import frappe
import requests
from bs4 import BeautifulSoup

@frappe.whitelist()
def nursingCall(roomNumber, value):
    rooms = frappe.db.get_list(
        'Patient Room',
        filters={'room_no': roomNumber},
        fields=["name"]
    )
    if len(rooms) > 0:
        pRoom = frappe.get_doc("Patient Room", rooms[0].name)

        if pRoom.nursing_station != None and pRoom.nursing_station != "":
            station = frappe.get_doc("Nursing Station", pRoom.nursing_station)
            
            url = f'{station.beeping_url}{value}'
            # A GET request to the API
            response = requests.get(url,verify=False)
            if response.status_code == 200:
                return {"result": 1}
            else:
                return {"result": 0}


@frappe.whitelist()
def ringingStatus(room_id):
    is_ringing = frappe.get_value("Patient Room", room_id, "is_calling")

    return is_ringing == 1 if is_ringing != None else False


@frappe.whitelist()
def onOffLights(roomNumber, index):
    rooms = frappe.db.get_list(
        'Patient Room',
        filters={'room_no': roomNumber},
        fields=["name"]
    )
    if len(rooms) > 0:
        pRoom = frappe.get_doc("Patient Room", rooms[0].name)

        deviceRooms = frappe.db.get_list(
            'Devices',
            filters={'patient_room': pRoom.name},
            fields=["name"]
        )
        if len(deviceRooms) > 0:
            devices = frappe.get_doc("Devices", deviceRooms[0].name)
            
            # Only devices in the child table
            myDevices = devices.devices
            value = lightStatus(roomNumber, index)['result']
            
            if value == 0:
                url = f'{myDevices[index].device_address}1'
                # A GET request to the API
                response = requests.get(url,verify=False)
                if response.status_code == 200:
                    
                    return {"result": 1}
                else:
                    return {"result": 0}

            elif value == 1:
                url = f'{myDevices[index].device_address}0'
                # A GET request to the API
                response = requests.get(url,verify=False)
                if response.status_code == 200:
                    
                    return {"result": 0}
                else:
                    return {"result": 0}

            if value != -1:
                return {"message":"ERROR"}

@frappe.whitelist()
def getTrans(lang):
    # translations = frappe.db.sql("""
    # SELECT name, source_text, translated_text, language
    # FROM `tabTranslation`
    # WHERE language = %(langs)s
    # """, values={"langs": lang}, as_dict=0)
    Translations = frappe.db.get_list("Translation", fields=["name", "source_text", "translated_text", "language"], filters={"language":lang}, limit_page_length=None)
    return {"data":Translations, "langauge": lang}

@frappe.whitelist()
def getLangs():
    langs = frappe.db.get_list("Language", fields=["name", "language_code", "language_name","flag"], limit_page_length=None)
    return {"data":langs}

@frappe.whitelist()
def lightStatus(roomNumber, index):
    rooms = frappe.db.get_list(
        'Patient Room',
        filters={'room_no': roomNumber},
        fields=["name"]
    )
    if len(rooms) > 0:
        pRoom = frappe.get_doc("Patient Room", rooms[0].name)

        deviceRooms = frappe.db.get_list(
            'Devices',
            filters={'patient_room': pRoom.name},
            fields=["name"]
        )
        if len(deviceRooms) > 0:
            devices = frappe.get_doc("Devices", deviceRooms[0].name)
            
            # Only devices in the child table
            myDevices = devices.devices
            
            url = f'{myDevices[index].status_url}'
            # A GET request to the API
            response = requests.get(url,verify=False)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content)

                body = soup.find('body')
                body_text = body.get_text()
                
                return {"result": int(body_text[-1])}
            else:
                return {"result": -1}
        else:
            return {"result": -1}
    else:
        return {"result": -1}