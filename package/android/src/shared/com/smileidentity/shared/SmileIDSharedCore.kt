package com.smileidentity.shared

import android.content.Context
import com.smileidentity.SmileID
import com.smileidentity.SmileIDCrashReporting
import com.smileidentity.models.AuthenticationRequest
import com.smileidentity.models.AuthenticationResponse
import com.smileidentity.models.BiometricKycJobStatusResponse
import com.smileidentity.models.Config
import com.smileidentity.models.DocumentVerificationJobStatusResponse
import com.smileidentity.models.EnhancedDocumentVerificationJobStatusResponse
import com.smileidentity.models.EnhancedKycAsyncResponse
import com.smileidentity.models.EnhancedKycRequest
import com.smileidentity.models.EnhancedKycResponse
import com.smileidentity.models.JobStatusRequest
import com.smileidentity.models.PrepUploadRequest
import com.smileidentity.models.PrepUploadResponse
import com.smileidentity.models.ProductsConfigRequest
import com.smileidentity.models.ProductsConfigResponse
import com.smileidentity.models.ServicesResponse
import com.smileidentity.models.SmartSelfieJobStatusResponse
import com.smileidentity.models.UploadRequest
import com.smileidentity.models.ValidDocumentsResponse
import com.smileidentity.networking.pollBiometricKycJobStatus
import com.smileidentity.networking.pollDocumentVerificationJobStatus
import com.smileidentity.networking.pollEnhancedDocumentVerificationJobStatus
import com.smileidentity.networking.pollSmartSelfieJobStatus
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.last
import kotlinx.coroutines.flow.map
import java.net.URL
import kotlin.time.Duration
import kotlin.time.Duration.Companion.milliseconds

/**
 * Shared business logic for SmileID SDK operations
 * Used by both React Native and Expo implementations to avoid code duplication
 */
object SmileIDSharedCore {

    // =====================================================
    // BASIC OPERATIONS (existing - enhanced versions)
    // =====================================================

    /**
     * Initialize SmileID SDK with various configuration options
     */
    fun initialize(
        context: Context,
        useSandBox: Boolean,
        enableCrashReporting: Boolean,
        config: Config? = null,
        apiKey: String? = null
    ): SmileIDSharedResult<Unit> {
        return try {
            when {
                // Case 1: Initialize with API key and config
                apiKey != null && config != null -> {
                    SmileID.initialize(
                        context = context,
                        apiKey = apiKey,
                        config = config,
                        useSandbox = useSandBox,
                        enableCrashReporting = enableCrashReporting
                    )
                }
                // Case 2: Initialize with just config
                config != null -> {
                    SmileID.initialize(
                        context = context,
                        config = config,
                        useSandbox = useSandBox,
                        enableCrashReporting = enableCrashReporting
                    )
                }
                // Case 3: Basic initialization
                else -> {
                    SmileID.initialize(
                        context = context,
                        useSandbox = useSandBox
                    )
                }
            }
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "SMILEID_INIT_ERROR",
                message = "Failed to initialize SmileID SDK: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Set callback URL
     */
    fun setCallbackUrl(callbackUrl: String): SmileIDSharedResult<Unit> {
        return try {
            SmileID.setCallbackUrl(callbackUrl = URL(callbackUrl))
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "CALLBACK_URL_ERROR",
                message = "Failed to set callback URL: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Disable crash reporting
     */
    fun disableCrashReporting(): SmileIDSharedResult<Unit> {
        return try {
            SmileIDCrashReporting.disable()
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "DISABLE_CRASH_REPORTING_ERROR",
                message = "Failed to disable crash reporting: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Set allow offline mode
     */
    fun setAllowOfflineMode(allowOfflineMode: Boolean): SmileIDSharedResult<Unit> {
        return try {
            SmileID.setAllowOfflineMode(allowOfflineMode)
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "OFFLINE_MODE_ERROR",
                message = "Failed to set offline mode: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Submit a job
     */
    suspend fun submitJob(jobId: String): SmileIDSharedResult<Unit> {
        return try {
            SmileID.submitJob(jobId)
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "SUBMIT_JOB_ERROR",
                message = "Failed to submit job: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Get unsubmitted jobs
     */
    fun getUnsubmittedJobs(): SmileIDSharedResult<List<String>> {
        return try {
            val jobs = SmileID.getUnsubmittedJobs()
            SmileIDSharedResult.Success(jobs)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "GET_UNSUBMITTED_JOBS_ERROR",
                message = "Failed to get unsubmitted jobs: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Get submitted jobs
     */
    fun getSubmittedJobs(): SmileIDSharedResult<List<String>> {
        return try {
            val jobs = SmileID.getSubmittedJobs()
            SmileIDSharedResult.Success(jobs)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "GET_SUBMITTED_JOBS_ERROR",
                message = "Failed to get submitted jobs: ${exception.message}",
                cause = exception
            )
        }
    }

    /**
     * Cleanup a job
     */
    fun cleanup(jobId: String): SmileIDSharedResult<Unit> {
        return try {
            SmileID.cleanup(jobId)
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "CLEANUP_ERROR",
                message = "Failed to cleanup job: ${exception.message}",
                cause = exception
            )
        }
    }

    // =====================================================
    // API OPERATIONS
    // =====================================================

    suspend fun authenticate(request: AuthenticationRequest): SmileIDSharedResult<AuthenticationResponse> {
        return try {
            val response = SmileID.api.authenticate(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "AUTHENTICATION_ERROR",
                message = "Authentication failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun prepUpload(request: PrepUploadRequest): SmileIDSharedResult<PrepUploadResponse> {
        return try {
            val response = SmileID.api.prepUpload(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "PREP_UPLOAD_ERROR",
                message = "Prep upload failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun upload(url: String, request: UploadRequest): SmileIDSharedResult<Unit> {
        return try {
            SmileID.api.upload(url, request)
            SmileIDSharedResult.Success(Unit)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "UPLOAD_ERROR",
                message = "Upload failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun doEnhancedKyc(request: EnhancedKycRequest): SmileIDSharedResult<EnhancedKycResponse> {
        return try {
            val response = SmileID.api.doEnhancedKyc(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "ENHANCED_KYC_ERROR",
                message = "Enhanced KYC failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun doEnhancedKycAsync(request: EnhancedKycRequest): SmileIDSharedResult<EnhancedKycAsyncResponse> {
        return try {
            val response = SmileID.api.doEnhancedKycAsync(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "ENHANCED_KYC_ASYNC_ERROR",
                message = "Enhanced KYC Async failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getSmartSelfieJobStatus(request: JobStatusRequest): SmileIDSharedResult<SmartSelfieJobStatusResponse> {
        return try {
            val response = SmileID.api.getSmartSelfieJobStatus(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "SMART_SELFIE_STATUS_ERROR",
                message = "Smart Selfie status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getDocumentVerificationJobStatus(request: JobStatusRequest): SmileIDSharedResult<DocumentVerificationJobStatusResponse> {
        return try {
            val response = SmileID.api.getDocumentVerificationJobStatus(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "DOCUMENT_VERIFICATION_STATUS_ERROR",
                message = "Document verification status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getBiometricKycJobStatus(request: JobStatusRequest): SmileIDSharedResult<BiometricKycJobStatusResponse> {
        return try {
            val response = SmileID.api.getBiometricKycJobStatus(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "BIOMETRIC_KYC_STATUS_ERROR",
                message = "Biometric KYC status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getEnhancedDocumentVerificationJobStatus(request: JobStatusRequest): SmileIDSharedResult<EnhancedDocumentVerificationJobStatusResponse> {
        return try {
            val response = SmileID.api.getEnhancedDocumentVerificationJobStatus(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "ENHANCED_DOCUMENT_VERIFICATION_STATUS_ERROR",
                message = "Enhanced document verification status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getProductsConfig(request: ProductsConfigRequest): SmileIDSharedResult<ProductsConfigResponse> {
        return try {
            val response = SmileID.api.getProductsConfig(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "PRODUCTS_CONFIG_ERROR",
                message = "Products config failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getValidDocuments(request: ProductsConfigRequest): SmileIDSharedResult<ValidDocumentsResponse> {
        return try {
            val response = SmileID.api.getValidDocuments(request)
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "VALID_DOCUMENTS_ERROR",
                message = "Valid documents failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun getServices(): SmileIDSharedResult<ServicesResponse> {
        return try {
            val response = SmileID.api.getServices()
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "SERVICES_ERROR",
                message = "Get services failed: ${exception.message}",
                cause = exception
            )
        }
    }

    // =====================================================
    // POLLING OPERATIONS
    // =====================================================

    private suspend fun <RequestType, ResponseType> pollJobStatus(
        apiCall: suspend (RequestType, Duration, Int) -> Flow<ResponseType>,
        request: RequestType,
        interval: Long,
        numAttempts: Long,
    ): ResponseType {
        return try {
            val response = withContext(Dispatchers.IO) {
                apiCall(request, interval.milliseconds, numAttempts.toInt())
                    .map { it }
                    .last()
            }
            response
        } catch (e: Exception) {
            throw e
        }
    }

    suspend fun pollSmartSelfieJobStatus(
        request: JobStatusRequest,
        interval: Long,
        numAttempts: Long
    ): SmileIDSharedResult<SmartSelfieJobStatusResponse> {
        return try {
            val response = pollJobStatus(
                apiCall = SmileID.api::pollSmartSelfieJobStatus,
                request = request,
                interval = interval,
                numAttempts = numAttempts
            )
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "POLL_SMART_SELFIE_ERROR",
                message = "Poll Smart Selfie status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun pollDocumentVerificationJobStatus(
        request: JobStatusRequest,
        interval: Long,
        numAttempts: Long
    ): SmileIDSharedResult<DocumentVerificationJobStatusResponse> {
        return try {
            val response = pollJobStatus(
                apiCall = SmileID.api::pollDocumentVerificationJobStatus,
                request = request,
                interval = interval,
                numAttempts = numAttempts
            )
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "POLL_DOCUMENT_VERIFICATION_ERROR",
                message = "Poll Document Verification status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun pollBiometricKycJobStatus(
        request: JobStatusRequest,
        interval: Long,
        numAttempts: Long
    ): SmileIDSharedResult<BiometricKycJobStatusResponse> {
        return try {
            val response = pollJobStatus(
                apiCall = SmileID.api::pollBiometricKycJobStatus,
                request = request,
                interval = interval,
                numAttempts = numAttempts
            )
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "POLL_BIOMETRIC_KYC_ERROR",
                message = "Poll Biometric KYC status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    suspend fun pollEnhancedDocumentVerificationJobStatus(
        request: JobStatusRequest,
        interval: Long,
        numAttempts: Long
    ): SmileIDSharedResult<EnhancedDocumentVerificationJobStatusResponse> {
        return try {
            val response = pollJobStatus(
                apiCall = SmileID.api::pollEnhancedDocumentVerificationJobStatus,
                request = request,
                interval = interval,
                numAttempts = numAttempts
            )
            SmileIDSharedResult.Success(response)
        } catch (exception: Exception) {
            SmileIDSharedResult.Error(
                code = "POLL_ENHANCED_DOCUMENT_VERIFICATION_ERROR",
                message = "Poll Enhanced Document Verification status failed: ${exception.message}",
                cause = exception
            )
        }
    }

    // =====================================================
    // SHARED COROUTINE INFRASTRUCTURE
    // =====================================================

    /**
     * Shared JSON serialization function using SmileID's Moshi adapter
     * @param result The result to serialize
     * @param clazz The class type for Moshi adapter
     * @return JSON string representation
     */
    fun <T> toJson(result: T, clazz: Class<T>): String {
        val adapter = SmileID.moshi.adapter(clazz)
        return adapter.toJson(result)
    }


    /**
     * Shared coroutine launch function for Expo AsyncFunction-based APIs with Map conversion
     * Handles exceptions and converts response objects to Maps for Expo
     * @param work The suspend function to execute
     * @param toMapConverter Function to convert the result to Map
     * @return Map representation of the result or throws CodedException
     */
//    suspend inline fun <T> launchForExpoWithMap(
//        work: suspend () -> SmileIDResult<T>,
//        crossinline toMapConverter: (T) -> Map<String, Any>
//    ): Map<String, Any> {
//        return withContext(Dispatchers.IO) {
//            when (val result = work()) {
//                is SmileIDResult.Success -> {
//                    when (result.data) {
//                        is Unit -> mapOf("success" to true)
//                        else -> toMapConverter(result.data)
//                    }
//                }
//                is SmileIDResult.Error -> throw expo.modules.kotlin.exception.CodedException(
//                    result.code,
//                    result.message,
//                    result.cause
//                )
//            }
//        }
//    }
}

/**
 * Result wrapper for SmileID operations with generic support
 */
sealed class SmileIDSharedResult<out T> {
    data class Success<T>(val data: T) : SmileIDSharedResult<T>()
    data class Error(val code: String, val message: String, val cause: Throwable? = null) : SmileIDSharedResult<Nothing>()
    data class WithError(val cause: Throwable) : SmileIDSharedResult<Nothing>()
}

// =====================================================
// HELPER EXTENSIONS
// =====================================================

//// Helper for easier usage in React Native
//fun <T> SmileIDResult<T>.unwrap(): T = when (this) {
//    is SmileIDResult.Success -> data
//    is SmileIDResult.Error -> throw Exception(message, cause)
//}

// =====================================================
// SHARED COMPOSE VIEW BUILDERS
// =====================================================



// =====================================================
// HELPER EXTENSIONS FOR MAP CONVERSION
// =====================================================

/**
 * Extension to convert Map to PersistentMap for SmileID APIs
 */
private fun Map<String, String>.toPersistentMap(): kotlinx.collections.immutable.ImmutableMap<String, String> {
    return kotlinx.collections.immutable.persistentMapOf<String, String>().putAll(this)
}
