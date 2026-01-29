# Copyright (c) 2023, Mosaab and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class PatientOrder(Document):
	def validate(self):
		self.calculate_totals()

	def calculate_totals(self):
		items = self.order_table

		total = 0
		for item in items:
			item_total_amount = item.price *item.qty
			item.total = item_total_amount

			total += item_total_amount

		vat_amount = total * float(self.vat_percent.split("%")[0]) / 100
		total_with_vat = total + vat_amount

		self.amount = total
		self.grand_total = total_with_vat
		self.vat = vat_amount
