import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { AuthenticationModel } from '../models/AuthenticationModel';

@Injectable({
    providedIn: 'root',
})
export class Globals {
    api_base_url = environment.api_base_url;
    app_base_url = environment.app_base_url;
    main_base_url = environment.main_base_url;
    cookie_domain = environment.cookie_domain;

    app_name = 'InstaRead';

    api_version = 'v1.0';

    cookie_names = {
        code_verifier: 'instaread.cv',
        session: 'instaread.session',
        auth: 'instaread.auth',
        user_id: 'instaread.user_id',
    };
    auth_data: AuthenticationModel;
    auto_redirect = false;

    file_max_size = 20 * 1024 * 1024; //20MB

    // current_country_code;

    constructor() {}
}
