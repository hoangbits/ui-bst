import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastrService } from 'ngx-toastr';

import { Company } from './index';
import { CompanyService } from './company.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { AlertDialog } from '../dialog/alert.dialog.component';
import * as _ from 'lodash';
@Component({
	selector: 'company-modal-content',
	templateUrl: './company.modal.edit.html',
	styleUrls: ['./company.modal.edit.css'],
	providers: [CompanyService]
})
export class CompanyModalEditComponent implements OnInit {
	title: string;
	company: Company;
	errorMsg: string;
	isSubmited: boolean;
	viewMode: boolean;
	fg: FormGroup;
	hdCompany: FormControl;
	locationCount: number;

	constructor(public bsModalRef: BsModalRef,
		private companyService: CompanyService,
		private fb: FormBuilder,
		private dialog: MdDialog,
		private modalService: BsModalService,
		private toastr: ToastrService) {
		this.company = this.company || new Company();
		this.viewMode = this.viewMode || true;
		this.createForm();
		this.getCountries();
	}

	ngOnInit() {
		this.hdCompany = new FormControl();
		this.hdCompany.valueChanges.subscribe(data=>{
			if(this.company.id){
				this.getCompanyLocations(this.company.id);
			}
		});
		
	}

	createForm() {
		this.fg = this.fb.group({
			companyName: new FormControl('', Validators.required),
			taxCode: new FormControl('', Validators.required),
			phone: '',
			fax: ''
		});
	}

	public saveClose() {
		this.isSubmited = true;
		if (this.fg.invalid) {
			return;
		}

		this.companyService.updateCompany(this.company).subscribe(data => {
			if (data) {
				this.modalService.setDismissReason('Yes');
				this.bsModalRef.hide();
			}
			else {
				this.toastr.warning('Update failed', 'Alert!');
			}
		},
			err => {
				this.toastr.warning(err, 'Alert!');
			});
	}

	public countries: any;
	public states: any;
	public cities: any;
	public selectedCountry: string;
	public selectedState: string;
	public selectedCity: string;


	countryOnChange(value) {
		this.getStates(value);
	}

	stateOnChange(value) {
		this.getCities(value);
	}

	getCountries() {
		this.companyService.getCountries().subscribe(
			result => {
				if (result.length) {
					this.countries = result;
					this.selectedCountry = 'MY';
					this.getStates(this.selectedCountry);
				}
				else {
					this.selectedCountry = '';
					this.selectedState = '';
					this.selectedCity = '';
				}
			},
			err => {
				console.log(err);
			});
	}

	getStates(countryCode) {
		this.companyService.getStates(countryCode).subscribe(
			result => {
				if (result.length) {
					this.states = result;
					this.selectedState = result[0].code;
					this.getCities(this.selectedState);
				}
				else {
					this.selectedState = '';
					this.selectedCity = '';
					this.states = [{ code: '', name: '' }];
					this.cities = [{ code: '', name: '' }];
				}
			},
			err => {
				console.log(err);
			});
	}

	getCities(stateCode) {
		this.companyService.getCities(stateCode).subscribe(
			result => {
				if (result.length) {
					this.cities = result;
					this.selectedCity = result[0].code;
				}
				else {
					this.selectedCity = '';
					this.cities = [{ code: '', name: '' }];
				}
			},
			err => {
				console.log(err);
			});
	}

	public postCode: string;
	public address: string;
	locationSubmit: boolean = false;
	msgLocation: string;
	locations: any;
	
	addLocation() {
		this.locationSubmit = true;
		if (!this.selectedCountry
			|| !this.selectedState
			|| !this.selectedCity
			|| !this.address
			|| !this.postCode) {
			return false;
		}
		if (!this.company.locations) {
			this.company.locations = [];
		}
		let data = this.company.locations || [];

		let countryName = '',
			stateName = '',
			cityName = '';
		_.each(this.countries, data => { if (data.code === this.selectedCountry) { countryName = data.name; } });
		_.each(this.states, data => { if (data.code === this.selectedState) { stateName = data.name; } });
		_.each(this.cities, data => { if (data.code === this.selectedCity) { cityName = data.name; } });

		let state = _.find(this.states, this.selectedState);
		let city = _.find(this.cities, this.selectedCity);
		let location = {
			countryCode: this.selectedCountry,
			countryName: countryName,
			stateCode: this.selectedState,
			stateName: stateName,
			cityCode: this.selectedCity,
			cityName: cityName,
			address: this.address,
			postCode: this.postCode,
			company: this.company.id
		};

		let dupl = _.find(this.locations, location);
		this.msgLocation = '';
		if (dupl) {
			this.toastr.warning('This location is exiting!', 'Alert!');
			return false;
		}

		data.push(location);

		this.companyService.updateLocation(location).subscribe(data => {
			this.locationSubmit = false;
			this.getCompanyLocations(this.company.id);
			this.toastr.success('A new location is added successfully!', 'Success!');
		},
			err => {
				this.toastr.warning('Save location failed!', 'Alert!');
			})
	}

	
	getCompanyLocations(companyId) {
		this.companyService.getCompanyLocations(companyId).subscribe(data => {
			this.locations = data;
			this.locationCount = data.length;
		})
	}

	removeLocation(id) {
		this.companyService.removeCompanyLocation(id).subscribe(data => {
			this.getCompanyLocations(this.company.id);
			this.toastr.success('Delete Location successfully!', 'Success!');
		},
			err => {
				this.toastr.warning('Delete location failed!', 'Alert!');
			})
	}

	public confirmDialog(id) {
		this.dialog.open(AlertDialog, {
			width: '400px', height: '170px', data: {
				title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
			}
		}).afterClosed().subscribe(result => {
			if (result === 'OK') {
				this.removeLocation(id);
			}
		});
	}

}