import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../services/Offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer;
  isLoading: boolean;
  isOfferFound: boolean;
  isOfferIdPresent: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private matSnackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.isOfferIdPresent = true;
      this.isLoading = true;
      this.offerService.getOffer(+params.get('id'))
        .then(
          offer => {
            this.isOfferFound = !!offer;
            this.offer = offer;
          }
        ).catch(() => {
          this.isOfferFound = false;
      }).finally(() => {
        this.isLoading = false;
      });
    });
  }

  startPayment() {
    this.matSnackbar.open("Payment successful", "Close", {
      duration: 2000,
    });
  }
}
