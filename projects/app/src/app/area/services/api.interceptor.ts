import { inject } from '@angular/core';
import { environment } from '../../../../../../environment/environment';
import { HttpInterceptorFn } from '@angular/common/http';


export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    // Check if the request URL is relative (not an absolute URL)
    const isRelativeUrl = !req.url.startsWith('http');
  
    // Decide the base URL based on the request
    let baseUrl = environment.api_base_url; // Default base URL
  
    if (req.url.includes('/auth')) {
      baseUrl = environment.auth_base_url; // Auth service
    }
  //    else if (req.url.includes('/data')) {
  //     baseUrl = environment.data_base_url; // Data service
  //   } else if (req.url.includes('/admin')) {
  //     baseUrl = environment.admin_base_url; // Admin service
  //   }
  
    // Clone the request with the selected base URL
    const apiReq = isRelativeUrl
      ? req.clone({ url: `${baseUrl}${req.url}` })
      : req;
  
    return next(apiReq);
  };



